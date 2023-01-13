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
    subtractProduct(state, action) {
      let removed = false;
      state = state.filter((product) => {
        if (!removed && product.id === action.payload.id) {
          removed = true;
          return product.id !== action.payload.id;
        } else return true;
      });
    },
    clearCart(state, action) {
      return [];
    },
  },
});

export default CartSlice.reducer;
