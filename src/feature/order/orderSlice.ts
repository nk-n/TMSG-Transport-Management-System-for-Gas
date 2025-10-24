import { Order } from "@/src/types/Order";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  list: Order[];
}

const initialState: OrderState = {
  list: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Order[]>) => {
      console.log("Updating order", action.payload);
      state.list = action.payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
