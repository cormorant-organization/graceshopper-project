import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSinglePuppy } from "./SinglePuppySlice";
import { CartSlice } from "../cart/CartSlice";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";

const SinglePuppyView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const puppy = useSelector((state) => state.puppy);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSinglePuppy(id));
  }, [dispatch]);

  const addToCartHandler = () => {
    let savedCart = JSON.parse(window.localStorage.getItem("cart"));
    if (savedCart) {
      savedCart.push(puppy);
    } else savedCart = [puppy];
    window.localStorage.setItem("cart", JSON.stringify(savedCart));
    navigate("/cart");
  };

  return (
    <>
      {puppy.name ? (
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader title={puppy.name} />
          <CardMedia
            component="img"
            height="300"
            image={puppy.photoURL}
            alt="image of a dog"
          />
          <CardContent>
            <Typography variant="h4" color="text.secondary">
              Breed:{" "}
              {puppy.breed.charAt(0).toUpperCase() + puppy.breed.slice(1)}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Skeleton variant="rectangular" width={500} height={500} />
        </Stack>
      )}
      <div>
        {puppy.breed ? (
          <>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <h2>{puppy.name}</h2>
              <img src={puppy.photoURL} />
            </Stack>
            <Stack direction="row" justifyContent="space-evenly">
              <Stack direction="column" spacing={1}>
                <p></p>
                <h4>
                  Breed:{" "}
                  {puppy.breed.charAt(0).toUpperCase() + puppy.breed.slice(1)}
                </h4>
                <h4>
                  Color:{" "}
                  {puppy.color.charAt(0).toUpperCase() + puppy.color.slice(1)}
                </h4>
                <h4>Age: {puppy.age}</h4>
                <h4>Price: ${puppy.price}</h4>
                <p style={{ width: 300 }}>{puppy.description}</p>
              </Stack>
              <Button variant="contained" onClick={addToCartHandler}>
                Add to cart
              </Button>
            </Stack>
          </>
        ) : (
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Skeleton variant="rectangular" width={500} height={500} />
          </Stack>
        )}
      </div>
    </>
  );
};

export default SinglePuppyView;
