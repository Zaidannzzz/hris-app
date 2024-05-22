import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import InitialState, { UpdateAuth } from "./AuthRedux";

const initialState: InitialState = {
  isAuth: false,
  isOnline: false,
};

export const AuthSlice = createSlice({
  name: UpdateAuth,
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setIsOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setIsOnline } = AuthSlice.actions;
//  export the reducer as follows for it to be able to be read by the store.
export default AuthSlice.reducer;
