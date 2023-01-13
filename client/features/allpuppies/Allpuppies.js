import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { CardActionArea, Button } from '@mui/material';
import { fetchAllPuppiesAsync, selectAllPuppies } from "./allpuppiesSlice";
import { me } from "../auth/authSlice";
import DeletePuppyButton from "../deletePuppy/DeletePuppyButton";



const Allpuppies = () => {
  const allPuppies = useSelector(selectAllPuppies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPuppiesAsync());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.me);
  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h3" component="h2" align="center">
        Puppies
      </Typography>
      <Grid container direction="row"
  justifyContent="center"
  alignItems="center" spacing={2}>
      <div>{allPuppies.map((puppy) => (
          <Grid key={puppy.id} item xs={12} sm={6} md={4} style={{
            display: "inline-block"
          }}>
            <NavLink to={`/puppies/${puppy.id}`}>
          <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={puppy.photoURL}
          alt="puppy image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {puppy.name} the {puppy.breed}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </NavLink>
    {user.isAdmin && (
            <>
            <NavLink to={`/puppies/${puppy.id}`}>
            <Button>Edit</Button>
            </NavLink>
            <DeletePuppyButton puppyId={puppy.id}/>
            </>
          )}
    </Grid>
      ))}</div>
      </Grid>
      {user.isAdmin && (
        <>
        <Button>Add New Puppy</Button>
        </>
      )}
    </div>
  );
};

export default Allpuppies;
