import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSinglePuppy } from "../SinglePuppyView/SinglePuppySlice";
import { fetchAllPuppiesAsync } from "../allpuppies/allpuppiesSlice";
import { Button } from '@mui/material';

const DeletePuppyButton = (props) => {
  const { puppyId } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (evt) => {
    evt.preventDefault();
    dispatch(deleteSinglePuppy(puppyId));
    dispatch(fetchAllPuppiesAsync());
    navigate("/puppies");
  };

  return (
    <Button className="delete-button" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeletePuppyButton;
