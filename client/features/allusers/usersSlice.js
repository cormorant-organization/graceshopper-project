import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsersAsync = createAsyncThunk("students", async () => {
  try {
    const { data } = await axios.get(`/api/users`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const addUserAsync = createAsyncThunk(
  "addUser",
  async ({ username, password, firstName, lastName }) => {
    const { data } = await axios.post("api/users", {
      username,
      password,
      firstName,
      lastName,
    });
    return data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export default usersSlice.reducer;
