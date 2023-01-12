import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { me } from "../auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h1">Welcome, {user.firstName}!</Typography>
      {user.isAdmin && (
        <Typography variant="h3">ADMINISTRATOR ACCOUNT</Typography>
      )}
      <Typography variant="h6">
        {user.firstName} {user.lastName}
      </Typography>
    </div>
  );
};

export default Profile;
