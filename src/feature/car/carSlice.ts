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
      state.list = state.list.map((car) => {
        if (car.id == action.payload) {
          return {
            license: car.license,
            type: car.type,
            weight: car.weight,
            id: car.id,
            status: car.status,
            note: car.note,
            available: false,
          };
        }
        return car;
      });
    },
  },
});

export const { setCars, removeCar } = carSlice.actions;
export default carSlice.reducer;
