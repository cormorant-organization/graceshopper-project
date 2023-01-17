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
  console.log(`all users: ${allUsers}`);

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);

  function createData(id, firstName, lastName, email) {
    return { id, firstName, lastName, email };
  }

  const rows = [
    allUsers.map((user) => {
      createData(
        `'${user.id}',
        '${user.firstName}',
        '${user.lastName}',
        '${user.email}'`
      );
    }),
    // createData("1", "Shoshana", "Levitt", "shoshana.levitt@gmail.com"),
  ];

  console.log(`Rows: ${rows}`);

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
              <TableCell align="left">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

//   return (
//     <div>
//       <Typography variant="h3" component="h2" align="center">
//         All Users
//       </Typography>
//       {/* <div>
//         {allUsers && allUsers.length
//           ? allUsers.map((user) => {
//               return (
//                 <Typography key={user.id}>
//                   {user.id}
//                   {user.username}
//                   {user.firstName}
//                   {user.lastName}
//                 </Typography>
//               );
//             })
//           : "No users found"}
//       </div> */}
//     </div>
//   );
// };

export default AllUsers;
