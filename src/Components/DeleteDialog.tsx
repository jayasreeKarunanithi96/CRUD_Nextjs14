import * as React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { CLOSE } from "@/services/redux/ModalReducer";
import { DELETEUSER } from "@/services/redux/GlobalDataReducer";

export default function DeleteUserDialog() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleClose = () => {
    dispatch(CLOSE());
  };
  const handleConfirm = () => {
    const uuid: string | null = searchParams.get("id") || null;
     params.forEach((value, key) => {
      params.delete(key);
    });
     router.push(pathname);

    dispatch(DELETEUSER(uuid));
   
    dispatch(CLOSE());
  };

  return (
    <React.Fragment>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you to Delete the User Details. Please Confirm Before Deleting.?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}
