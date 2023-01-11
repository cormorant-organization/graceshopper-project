import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchAllPuppiesAsync = createAsyncThunk(
  "allPuppies",
  async () => {
    try {
      const response = await axios.get(`/api/puppies`);
      const puppies = response.data;
      return puppies;
    } catch (err) {
      console.log("YOU HAVE A PROBLEM WITH FETCHALLPUPPIESASYNC", err);
    }
  }
)

export const allPuppiesSlice = createSlice({
  name: "allPuppies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPuppiesAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllPuppies = (state) => {
  return state.allPuppies;
};

export default allPuppiesSlice.reducer;
