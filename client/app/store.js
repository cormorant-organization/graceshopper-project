import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import allPuppiesReducer from "../features/allpuppies/allpuppiesSlice";

const store = configureStore({
  reducer: { auth: authReducer, allPuppies: allPuppiesReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
export * from "../features/allpuppies/allpuppiesSlice";
