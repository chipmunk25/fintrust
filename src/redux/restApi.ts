import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { camelizeKeys } from "humps";

import { REST_API_URL } from "~/lib/constants";

import { waitForTimeout } from "~/lib/utils";

// Example transformation function
import { loadSessionStore } from "./session";
import { AuthState, authActions } from "./slice/auth";
import Person from "~/pages/person";

const baseQuery = fetchBaseQuery({
  baseUrl: REST_API_URL,
  credentials: "same-origin",
  mode: "cors",
  prepareHeaders: async (headers, { getState }) => {
    const auth = await loadSessionStore();

    // Retrieve the token from your Redux state
    const token = auth?.accessToken;
    const refreshToken = auth?.refreshToken;

    const getStateAuth = getState();

    const persistedAuth = getStateAuth as typeof getStateAuth & {
      persistedReducer: { auth: AuthState };
    };

    const pAuth = persistedAuth.persistedReducer.auth;
    const triggerRefresh = pAuth?.triggerRefresh;

    // If the token exists, set the Authorization header

    if (triggerRefresh) {
      if (refreshToken) {
        headers.set("Authorization", `Bearer ${refreshToken}`);
      }
    } else {
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return headers;
  },
});

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseQueryWithCamelize: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions = {}) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.data) {
    result.data = camelizeKeys(result.data as any);
  }
  if (result.error) {
    const redirectTo = window.location.pathname;
    result.error = camelizeKeys(
      result.error.data as any
    ) as FetchBaseQueryError;
    const errorResponse = result.error as FetchBaseQueryError;
    result.error = errorResponse;
    if (result.error.status === 401) {
      // try to get a new token

      api.dispatch(authActions.setTriggerRefresh(true));
      const refreshResult = await baseQuery(
        "/auth/applicant/refresh-token",
        api,
        extraOptions
      );

      api.dispatch(authActions.setTriggerRefresh(false));
      if (refreshResult.data) {
        // store the new token in the store or wherever you keep it
        // api.dispatch(
        //   authActions.setTokens({
        //     // accessToken: refreshed.accessToken,
        //     refreshToken: refreshed.refreshToken,
        //   })
        // );

        // retry the initial query
        await waitForTimeout(1000);

        result = await baseQuery(args, api, extraOptions);
      } else {
        // refresh failed - do something like redirect to login or show a "retry" button
        const err = result.error as typeof result.error & { errorCode: number };
        const errorCode = err?.errorCode;

        if (errorCode === 923103 || errorCode === 923112) {
          window.location.href = `/logout?redirectTo=${redirectTo}`;
        }
        // if (errorCode === 923112) {
        //   window.location.href = `/logout?redirectTo=${redirectTo}`;
        // }
      }
    }
  }
  return result;
};

export const restApi = createApi({
  baseQuery: baseQueryWithCamelize,
  endpoints: (builder) => ({
    logout: builder.query({
      query: (queryArg) => ({
        url: `/api/v${queryArg.version}/auth/logout`,
        method: "POST",
        headers: { "App-Name": queryArg["App-Name"] },
      }),
    }),

    Login: builder.mutation({
      query: (queryArg) => ({
        url: `/api/v${queryArg.version}/auth/login`,
        method: "POST",
        body: queryArg.loginRequest,
        headers: { "App-Name": queryArg["App-Name"] },
      }),
    }),
    forgotPassword: builder.mutation({
      query: (queryArg) => ({
        url: `/api/v${queryArg.version}/auth/forgot-password`,
        method: "POST",
        body: queryArg.forgotPasswordRequest,
        headers: { "App-Name": queryArg["App-Name"] },
      }),
    }),
    getInspections: builder.query({
      query: (queryArg) => ({
        url: `/api/v${queryArg.version}/inspections`,
        headers: { "App-Name": queryArg["App-Name"] },
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          "with-disabled": queryArg["with-disabled"],
        },
      }),
    }),

    setPassword: builder.mutation({
      query: (queryArg) => ({
        url: `/api/v${queryArg.version}/auth/set-password`,
        method: "POST",
        body: queryArg.setPasswordRequest,
        headers: {
          "App-Name": queryArg["App-Name"],
        },
      }),
    }),

    createEmployee: builder.mutation({
      query: (queryArg) => ({
        url: `/api/employment/save`,
        method: "POST",
        body: queryArg.employmentRequest,
      }),
    }),

    // start desmond section of code

    changePassword: builder.mutation({
      query: (queryArg) => ({
        url: `/api/v${queryArg.version}/auth/change-password`,
        method: "POST",
        body: queryArg.resetPasswordRequest,
        headers: { "App-Name": queryArg["App-Name"] },
      }),
    }),
    createIncident: builder.mutation({
      query: (queryArg) => ({
        url: `/api/v${queryArg.version}/incident`,
        method: "POST",
        body: queryArg.createIncidentRequest,
        headers: { "App-Name": queryArg["App-Name"] },
      }),
    }),

    profile: builder.query({
      query: (queryArg) => ({
        url: `/api/v${queryArg.version}/employee/${queryArg.id}`,
        headers: { "App-Name": queryArg["App-Name"] },
      }),
    }),

    // end desmond section of code
    //start achaasa section of code
    Signup: builder.mutation({
      query: (queryArg) => ({
        url: `/api/users/signup/`,
        method: "POST",
        body: queryArg.signupRequest,
      }),
    }),
    CreatePerson: builder.mutation({
      query: (queryArg) => ({
        url: `/api/persons/create/`,
        method: "POST",
        body: queryArg.personRequest,
      }),
    }),

    //end achaasa section of code
     //start python section of code
     SaveGuarantorRecords: builder.mutation({
      query: (queryArg) => ({
        url: `/api/guarantor/save`,
        method: "POST",
        body: queryArg.saveRecords
       
      }),
    }),

    createBank: builder.mutation({
      query: (queryArg) => ({
        url: `/api/banks/create`,
        method: "POST",
        body: queryArg.createBank
       
      }),
      //end Clement Section of code
    }),

   
  }),

  refetchOnMountOrArgChange: true,
});
