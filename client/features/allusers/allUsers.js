import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsersAsync, selectAllUsers } from "./usersSlice";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AllUsers = () => {
  const allUsers = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);

  function createData(id, firstName, lastName, username) {
    return { id, firstName, lastName, username };
  }

  const rows = [];
  allUsers.forEach((user) => {
    rows.push(
      createData(user.id, user.firstName, user.lastName, user.username)
    );
  });

  return (
    <TableContainer component={Paper} sx={{ m: 1 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">User ID</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.firstName}</TableCell>
              <TableCell align="left">{row.lastName}</TableCell>
              <TableCell align="left">{row.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllUsers;
