import { Car } from "@/src/types/CarDriver";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CarState {
  list: Car[];
}

const initialState: CarState = {
  list: [],
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.list = action.payload;
    },
    removeCar: (state, action: PayloadAction<string>) => {
      state.list = state.list.map((element) => {
        if (element.id == action.payload) {
          let newCar = element;
          newCar.available = true;
          return newCar;
        }
        return element;
      });
    },
  },
});

export const { setCars, removeCar } = carSlice.actions;
export default carSlice.reducer;
