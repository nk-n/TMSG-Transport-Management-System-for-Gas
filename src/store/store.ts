import { configureStore } from "@reduxjs/toolkit";
import carReducer from "@/src/feature/car/carSlice";
import driverReducer from "@/src/feature/driver/driverSlice";
import destinationReducer from "@/src/feature/destination/destinationSlice";

export const store = configureStore({
  reducer: {
    car: carReducer,
    driver: driverReducer,
    destination: destinationReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch