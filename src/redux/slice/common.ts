import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// import { VerifyOtpResponseDto } from "./endpoints";
import { ReduxState } from "../store";

export interface CommonState {
  searchInput: string;
  employeeIds: string[];
  employeeId: string;
  itemId: string;
  personId: string;
}

const initialState: CommonState = {
  searchInput: "",
  employeeIds: [],
  employeeId: "",
  itemId: "",
  personId: "",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string, string>) => {
      state.searchInput = action.payload;
    },
    selectEmployees: (state, action: PayloadAction<string[], string>) => {
      state.employeeIds = action.payload;
    },
    selectEmployee: (state, action: PayloadAction<string, string>) => {
      state.employeeId = action.payload;
    },
    selectItemId: (state, action: PayloadAction<string, string>) => {
      state.itemId = action.payload;
    },

    selectPersonId: (state, action: PayloadAction<string, string>) => {
      state.personId = action.payload;
    },

    resetEmployees: (state) => {
      state.employeeIds = [];
    },
    resetEmployee: (state) => {
      state.employeeId = "";
    },
    resetItemId: (state) => {
      state.itemId = "";
    },
    resetPersonId: (state) => {
      state.personId = "";
    },

    clearSearchValue: (state) => {
      state.searchInput = "";
    },
  },
});

// function createSelector<T>(fn: (d: ReduxState["common"]) => T) {
//   return ({ common }: ReduxState) => fn(common);
// }
function createSelector<T>(
  fn: (d: ReduxState["persistedReducer"]["common"]) => T
) {
  return ({ persistedReducer: { common } }: ReduxState) => fn(common);
}
export const common = createSelector((common: CommonState) => common);
export const searchValue = createSelector(
  (common: CommonState) => common.searchInput
);
export const commonActions = commonSlice.actions;

const commonReducer = commonSlice.reducer;

export default commonReducer;
