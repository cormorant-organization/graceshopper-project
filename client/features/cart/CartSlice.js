import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.push(action.payload);
    },
    removeProduct(state, action) {
      state = state.filter((product) => product.id !== action.payload.id);
    },
    clearCart(state, action) {
      return [];
    },
  },
});

export default CartSlice.reducer;
