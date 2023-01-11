import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <div>
        <Typography variant="h4" align="center" margin={3}>
          Welcome to the homepage!
        </Typography>
      </div>
    </div>
  );
};

export default Home;
