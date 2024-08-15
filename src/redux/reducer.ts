import { combineReducers } from "redux";

import authReducer from "./slice/auth";
import commonReducer from "./slice/common";

const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
});

export default rootReducer;
