import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("fetch/cart", async (id) => {
  try {
    const { data } = await axios.get(`/api/orders/${id}`);
    return data;
  } catch (err) {
    return err.message;
  }
});

export const addToCart = createAsyncThunk(
  "add/cart",
  async ({ userId, puppyId }) => {
    try {
      const { data } = await axios.post(`/api/orders/${userId}`, {
        puppyId: puppyId,
      });
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const clearCart = createAsyncThunk("clear/cart", async (id) => {
  try {
    await axios.delete(`/api/orders/${id}/clearCart`);
  } catch (err) {
    return err.message;
  }
});

export const removeProductFromCart = createAsyncThunk(
  "removeProduct/cart",
  async (id, puppyId) => {
    try {
      const { data } = await axios.delete(
        `/api/orders/${id}/removeProduct`,
        puppyId
      );
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const decrementProduct = createAsyncThunk(
  "decrementProduct/cart",
  async (id, puppyId) => {
    try {
      const { data } = await axios.delete(
        `/api/orders/${id}/decrementProduct`,
        puppyId
      );
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const checkout = createAsyncThunk("checkout/cart", async (id) => {
  try {
    await axios.put(`api/orders/${id}`);
  } catch (err) {
    return err.message;
  }
});

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
  extraReducers(builder) {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        return [];
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state = state.filter((product) => product.id !== action.payload);
      })
      .addCase(decrementProduct, (state, action) => {
        let removed = false;
        state = state.filter((product) => {
          if (!removed && product.id === action.payload.puppyId) {
            removed = true;
            return product.id !== action.payload.puppyId;
          } else return true;
        });
      })
      .addCase(checkout.fulfilled, (state, action) => {
        return [];
      });
  },
});

export default CartSlice.reducer;
