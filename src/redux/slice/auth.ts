import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// import { VerifyOtpResponseDto } from "./endpoints";
import { ReduxState } from "../store";

export interface AuthState {
  accessToken: string;
  refreshToken: string;
  userId: string;
  triggerRefresh: boolean;
  avatar?: string | null;
  expiresIn?: number | null;
}

const initialState: AuthState = {
  accessToken: "",
  refreshToken: "",
  userId: "",
  expiresIn: null,
  avatar: null,
  triggerRefresh: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<
        Pick<
          any,
          "accessToken" | "refreshToken" | "avatar" | "expiresIn" | "userId"
        >,
        string
      >,
    ) => {
      state.accessToken = action.payload.accessToken as string;
      state.refreshToken = action.payload.refreshToken as string;
      state.avatar = action.payload.avatar as string;
      state.expiresIn = action.payload.expiresIn as number;
      state.userId = action.payload.userId as string;
    },
    setUserId: (state, action: PayloadAction<string, string>) => {
      state.userId = action.payload;
    },
    setTriggerRefresh: (state, action: PayloadAction<boolean, string>) => {
      state.triggerRefresh = action.payload;
    },
    clearTokens: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.userId = "";
      state.expiresIn = null;
      state.avatar = null;
      state.triggerRefresh = false;
    },
  },
});

function createSelector<T>(
  fn: (d: ReduxState["persistedReducer"]["auth"]) => T,
) {
  return ({ persistedReducer: { auth } }: ReduxState) => fn(auth);
}
export const selectCurrentAuthUser = createSelector((auth: AuthState) => auth);
export const authActions = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
