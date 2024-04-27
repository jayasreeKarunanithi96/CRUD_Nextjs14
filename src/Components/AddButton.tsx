"use client";

import { useDispatch } from "react-redux";
import { OPEN } from "@/services/redux/ModalReducer";
import UserForm from "@/Components/UserForm";
import { Button } from "@mui/material";

export default function AddButton() {
  const dispatch = useDispatch();
  const handleAddUser = () => {
    console.log("handleAddUser");
    dispatch(OPEN({ modalComponent: <UserForm /> }));
  };
  return (
    <Button variant="contained" onClick={() => handleAddUser()}>
      Add user
    </Button>
  );
}
