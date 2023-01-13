import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsersAsync, selectAllUsers } from "./usersSlice";
import { Typography } from "@mui/material";

const AllUsers = () => {
  const allUsers = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  console.log(`all users: ${allUsers}`);

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h3" component="h2" align="center">
        All Users
      </Typography>
      <div>
        {allUsers && allUsers.length
          ? allUsers.map((user) => {
              return (
                <Typography key={user.id}>
                  {user.id}
                  {user.username}
                  {user.firstName}
                  {user.lastName}
                </Typography>
              );
            })
          : "No users found"}
      </div>
    </div>
  );
};

export default AllUsers;
