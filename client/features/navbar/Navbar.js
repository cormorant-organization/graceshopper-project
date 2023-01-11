import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, BrowserRouter } from "react-router-dom";
import { logout } from "../../app/store";
import { Button, AppBar, Toolbar } from "@mui/material";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    // <div>
    //   <h1>Grace Shopper - Team Cormorant</h1>
    //   <nav>
    //     {isLoggedIn ? (
    //       <div>
    //         {/* The navbar will show these links after you log in */}
    //         <button type="button" onClick={logoutAndRedirectHome}>
    //           Logout
    //         </button>
    //       </div>
    //     ) : (
    //       <div>
    //         {/* The navbar will show these links before you log in */}
    //         <Link to="/home">Home</Link>
    //         <Link to="/login">Login</Link>
    //         <Link to="/signup">Sign Up</Link>
    //       </div>
    //     )}
    //   </nav>
    //   <hr />
    // </div>
    // <BrowserRouter>
    <div>
      <h1>Grace Shopper - Team Cormorant</h1>
      <AppBar position="static">
        <Toolbar sx={{ p: -1 }}>
          <Button
            href="/home"
            color="secondary"
            variant="outlined"
            sx={{ m: 1 }}
          >
            Home
          </Button>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Button
                onClick={logoutAndRedirectHome}
                color="secondary"
                variant="outlined"
                sx={{ m: 1 }}
              >
                Log Out
              </Button>
            </div>
          ) : (
            <div>
              <Button
                href="/login"
                color="secondary"
                variant="outlined"
                sx={{ m: 1 }}
              >
                Log In
              </Button>
              <Button
                href="/signup"
                color="secondary"
                variant="outlined"
                sx={{ m: 1 }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {/* <main>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </main> */}
    </div>
    // </BrowserRouter>
  );
};

export default Navbar;
