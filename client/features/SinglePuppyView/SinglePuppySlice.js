import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSinglePuppy = createAsyncThunk(
  "puppies/fetchSingle",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/puppies/${id}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

const initialState = {};

const SinglePuppySlice = createSlice({
  name: "puppy",
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchSinglePuppy.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default SinglePuppySlice.reducer;
