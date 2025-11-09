import { Destination } from "@/src/types/Destination";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DestinationState {
  list: Destination[];
}

const initialState: DestinationState = {
  list: [],
};

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setDestinations: (state, action: PayloadAction<Destination[]>) => {
      state.list = action.payload;
    },
    removeDestination: (state, action: PayloadAction<string>) => {
      state.list = state.list.map((dest) => {
        if (dest.name == action.payload) {
          return {
            name: dest.name,
            address: dest.address,
            city: dest.city,
            region: dest.region,
            route: dest.route,
            distance: dest.distance,
            available: false,
            timeUsed: dest.timeUsed,
          };
        }
        return dest;
      });
    },
  },
});

export const { setDestinations, removeDestination } = destinationSlice.actions;
export default destinationSlice.reducer;
