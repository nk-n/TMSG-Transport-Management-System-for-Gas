import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JWTState {
  jwt: string
}

const initialState: JWTState = {
  jwt: "",
};

const JWTSlice = createSlice({
  name: "JWT",
  initialState,
  reducers: {
    setJWT: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    removeJWT: (state, action: PayloadAction<string>) => {
      state.jwt = ""
  },
}});

export const { setJWT, removeJWT } = JWTSlice.actions;
export default JWTSlice.reducer;
