import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import allPuppiesReducer from "../features/allpuppies/allpuppiesSlice";
import SinglePuppyReducer from "../features/SinglePuppyView/SinglePuppySlice";
import allUsersReducer from "../features/allusers/usersSlice";
import CartReducer from "../features/cart/CartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allPuppies: allPuppiesReducer,
    puppy: SinglePuppyReducer,
    users: allUsersReducer,
    cart: CartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
export * from "../features/allpuppies/allpuppiesSlice";
export * from "../features/allusers/usersSlice";
