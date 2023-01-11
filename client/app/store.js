import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import SinglePuppyReducer from "../features/SinglePuppyView/SinglePuppySlice";

const store = configureStore({
  reducer: { auth: authReducer, puppy: SinglePuppyReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
