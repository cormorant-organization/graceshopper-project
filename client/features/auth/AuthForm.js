import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { Grid, TextField } from '@mui/material';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <div>
      <p>Already have an account with us?</p>
      <form onSubmit={handleSubmit} name={name}>
        <Grid container>
          <Grid item xs={6}>
            <TextField
            variant="outlined"
            label="email"
            name="username"
            type="email"
            />
            <TextField
            variant="outlined"
            label="password"
            name="password"
            type="password"
            />
          </Grid>
        </Grid>
        {/* <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div> */}
        {/* <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div> */}
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
      <p>New Visitor?</p>
      <form>
      <Grid container>
          <Grid item xs={6}>
            <TextField
            variant="outlined"
            label="email"
            name="username"
            type="email"
            />
          </Grid>
        </Grid>
        <div>
          <button>Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
