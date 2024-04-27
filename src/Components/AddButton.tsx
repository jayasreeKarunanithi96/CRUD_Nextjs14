"use client";

import { useDispatch } from "react-redux";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { OPEN } from "@/services/redux/ModalReducer";
import UserForm from "@/Components/UserForm";
import { Button } from "@mui/material";

export default function AddButton() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const handleAddUser = () => {
    params.set("action", "add");

    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
    console.log("handleAddUser");
    dispatch(OPEN({ modalComponent: <UserForm /> }));
  };
  return (
    <Button variant="contained" onClick={() => handleAddUser()}>
      Add user
    </Button>
  );
}
