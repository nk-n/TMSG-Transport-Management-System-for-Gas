import { Driver } from "@/src/types/CarDriver";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DriverState {
  list: Driver[];
}

const initialState: DriverState = {
  list: [],
};

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setDriver: (state, action: PayloadAction<Driver[]>) => {
      state.list = action.payload;
    },
    removeDriver: (state, action: PayloadAction<string>) => {
      state.list = state.list.map((element) => {
        if (element.id == action.payload) {
          let newDriver = element;
          newDriver.available = true;
          return newDriver;
        }
        return element;
      });
    },
  },
});

export const { setDriver, removeDriver } = driverSlice.actions;
export default driverSlice.reducer;
