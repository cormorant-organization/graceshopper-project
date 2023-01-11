import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, BrowserRouter } from "react-router-dom";
import { logout } from "../../app/store";
import { Button, AppBar, Toolbar, IconButton, Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: grey[300] }}>
        <Toolbar sx={{ p: -1 }}>
          <Button href="/" variant="text" sx={{ m: 1, color: "black" }}>
            Home
          </Button>
          <Button href="/puppies" variant="text" sx={{ m: 1, color: "black" }}>
            All Puppies
          </Button>
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

          <IconButton>
            <Badge badgeContent={5} color="primary" sx={{ m: 2 }}>
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
