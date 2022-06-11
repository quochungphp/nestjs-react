import { combineReducers } from "@reduxjs/toolkit";
import { signInByPasswordReducer } from "./signin-request-by-password/sliceReducer";


const rootReducer = combineReducers({
  signInByPasswordReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
