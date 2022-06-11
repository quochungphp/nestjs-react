/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { RootState } from "../rootReducer";
import { RequestState, RequestStatus } from "../types";
import { UserResponseDto } from "../../domain";
import { postSignInByPassword } from "./action";

export interface SignInByPasswordState extends RequestState {
  data: UserResponseDto;
  loading: boolean;
  isAuth: boolean,

}

export const initialState: SignInByPasswordState = {
  status: RequestStatus.idle,
  loading: false,
  data: <UserResponseDto>{},
  isAuth: false
};

export const signInByPasswordSlice = createSlice({
  name: "signInByPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postSignInByPassword.pending, (state) => {
      state.status = RequestStatus.requesting;
      state.loading = true;
    });
    builder.addCase(postSignInByPassword.fulfilled, (state, { payload }) => {
      state.status = RequestStatus.success;
      state.loading = false;
      state.data = payload;
      state.isAuth = true
    });
    builder.addCase(postSignInByPassword.rejected, (state) => {
      state.status = RequestStatus.failed;
      state.loading = false;
    });
  },
});

export const signInByPasswordReducer = signInByPasswordSlice.reducer;
export const signInByPasswordSelector = (state: RootState) =>
  state.signInByPasswordReducer;
