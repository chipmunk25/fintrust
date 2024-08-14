import { combineReducers } from "redux";

import authReducer from "./slice/auth";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
