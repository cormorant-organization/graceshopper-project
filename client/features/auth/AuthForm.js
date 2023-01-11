import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { addUserAsync } from "../allusers/usersSlice";
import { TextField, Button } from "@mui/material";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(authenticate({ username, password, method: formName }));
    dispatch(addUserAsync({ username, password, firstName, lastName }));
    setUsername("");
    setPassword("");
    setFirstName("");
    setLastName("");
    console.log("clicked!");
  };

  return (
    <div>
      <form name={name} onSubmit={handleSubmit} sx={{ m: 2 }}>
        <TextField
          label="Username"
          value={username}
          variant="outlined"
          sx={{ m: 2 }}
          style={{ width: 250 }}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="First Name"
          value={firstName}
          variant="outlined"
          sx={{ m: 2 }}
          style={{ width: 250 }}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          variant="outlined"
          sx={{ m: 2 }}
          style={{ width: 250 }}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          label="Password"
          value={password}
          variant="outlined"
          sx={{ m: 2 }}
          style={{ width: 250 }}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br></br>
        <Button type="submit" color="primary" variant="contained" sx={{ m: 2 }}>
          Create
        </Button>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
