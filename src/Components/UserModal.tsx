"use client";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE } from "../services/redux/ModalReducer";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 20,
  p: 1,
  overFlow: "scroll",
};

export default function UserModal() {
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.modal);
  const handleClose = () => dispatch(CLOSE());

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={selector.open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={selector.open}>
          <Box sx={style}>{selector.modalComponent}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
