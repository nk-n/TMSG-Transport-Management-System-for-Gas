import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DestinationState {
  list: Destination[]
}

const initialState : DestinationState = {
  list: []
}

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setDestinations: (state, action : PayloadAction<Destination[]>) => {
      state.list = action.payload
    },
    removeDestination: (state, action: PayloadAction<string>) => {
      state.list = state.list.map((element) => {
        if (element.address == action.payload) {
          let newCar = element
          newCar.isDelete = true
          return newCar 
        }
        return element
      }) 
    }
  }
})

export const { setDestinations, removeDestination} = destinationSlice.actions
export default destinationSlice.reducer