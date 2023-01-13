import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import Allpuppies from "../features/allpuppies/Allpuppies";
import SinglePuppyView from "../features/SinglePuppyView/SinglePuppyView";
import Profile from "../features/profile/Profile";
import Cart from "../features/cart/Cart";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);
  const user = useSelector((state) => state.auth.me);
  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/puppies"
          element={<Allpuppies name="allpuppies" displayName="All Puppies" />}
        />
        <Route path="/puppies/:id" element={<SinglePuppyView />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      {isLoggedIn ? (
        <Routes>
          <Route path="/user" element={<Profile />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
