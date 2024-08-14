import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// import { VerifyOtpResponseDto } from "./endpoints";
import { ReduxState } from "../store";

export interface CommonState {
  searchInput: string;
  employeeIds: string[];
  employeeId: string;
  itemId: string;
}

const initialState: CommonState = {
  searchInput: "",
  employeeIds: [],
  employeeId: "",
  itemId: "",
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

    resetEmployees: (state) => {
      state.employeeIds = [];
    },
    resetEmployee: (state) => {
      state.employeeId = "";
    },
    resetItemId: (state) => {
      state.itemId = "";
    },

    clearSearchValue: (state) => {
      state.searchInput = "";
    },
  },
});

function createSelector<T>(fn: (d: ReduxState["common"]) => T) {
  return ({ common }: ReduxState) => fn(common);
}

export const common = createSelector((common: CommonState) => common);
export const searchValue = createSelector(
  (common: CommonState) => common.searchInput,
);
export const commonActions = commonSlice.actions;

const commonReducer = commonSlice.reducer;

export default commonReducer;
