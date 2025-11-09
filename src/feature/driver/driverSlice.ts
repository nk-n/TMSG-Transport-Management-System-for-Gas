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
      state.list = state.list.map((driver) => {
        if (driver.tel == action.payload) {
          return {
            name: driver.name,
            tel: driver.tel,
            status: driver.status,
            note: driver.note,
            available: false,
            line_id: driver.line_id,
          };
        }
        return driver;
      });
    },
  },
});

export const { setDriver, removeDriver } = driverSlice.actions;
export default driverSlice.reducer;
