import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { me } from "../auth/authSlice";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Typography,
} from "@mui/material";
import { ShoppingCart, Home } from "@mui/icons-material";
import { grey, blue } from "@mui/material/colors";
import { fetchCart } from "../cart/CartSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  const user = useSelector((state) => state.auth.me);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(me());
    if (isLoggedIn) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch]);

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: grey[300] }}>
        <Toolbar sx={{ p: -1 }}>
          <IconButton href="/">
            <Home></Home>
          </IconButton>
          <Button href="/puppies" variant="text" sx={{ m: 1, color: "black" }}>
            All Puppies
          </Button>
          {user.isAdmin && (
            <div>
              <Button
                href="/allusers"
                variant="text"
                sx={{ m: 1, color: "black" }}
              >
                All Users
              </Button>
              <Button variant="text" sx={{ m: 1, color: "blue" }}>
                You Are In The Admin View
              </Button>
            </div>
          )}
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Button
                onClick={logoutAndRedirectHome}
                color="secondary"
                variant="text"
                sx={{ m: 1 }}
              >
                Log Out
              </Button>
              <IconButton href="/user">
                <Avatar sx={{ bgcolor: blue[300] }}>
                  {user.firstName.charAt(0)}
                </Avatar>
              </IconButton>
            </div>
          ) : (
            <div>
              <Button
                href="/login"
                variant="text"
                sx={{ m: 1, color: "black" }}
              >
                Log In
              </Button>
              <Button
                href="/signup"
                variant="text"
                sx={{ m: 1, color: "black" }}
              >
                Sign Up
              </Button>
            </div>
          )}
          <IconButton href="/cart">
            <Badge
              badgeContent={
                isLoggedIn
                  ? cart
                    ? cart.length
                    : null
                  : JSON.parse(window.localStorage.getItem("cart"))
                  ? JSON.parse(window.localStorage.getItem("cart")).length
                  : null
              }
              color="primary"
              sx={{ m: 2 }}
            >
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
