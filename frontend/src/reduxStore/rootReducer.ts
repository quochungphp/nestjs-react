import { combineReducers } from "@reduxjs/toolkit";
import { signInByPasswordReducer } from "./signin-request-by-password/sliceReducer";
import { userSignUpReducer } from "./signup-request/sliceReducer";


const rootReducer = combineReducers({
  signInByPasswordReducer,
  userSignUpReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
