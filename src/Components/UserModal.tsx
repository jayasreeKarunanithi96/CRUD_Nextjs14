"use client";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { CLOSE } from "../services/redux/ModalReducer";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 2,
  borderRadius: "5px",
  overFlow: "scroll",
};

export default function UserModal() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selector = useSelector((state: any) => state.modal);
  const handleClose = () => dispatch(CLOSE());
  const handleClickAway = () => {
    console.log("handleClickAway");

      const params = new URLSearchParams(searchParams);
      params.forEach((value, key) => {
      params.delete(key);

    });
      dispatch(CLOSE())

    console.log("params", params);
    router.push(pathname);
  };

  return (
    <div>
       {/* <ClickAwayListener onClickAway={handleClickAway}> */}
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
          {/* </ClickAwayListener> */}
      
    </div>
  );
}
