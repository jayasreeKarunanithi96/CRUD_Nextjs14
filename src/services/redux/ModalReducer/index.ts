/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModalSliceState {
  open: boolean;
  modalComponent: React.ReactNode;
}

const initialState: IModalSliceState = {
  open: false,
  modalComponent: "",
};

const ModalStateSlice = createSlice({
  name: "modalState",
  initialState,
  reducers: {
    CLOSE: (state: any) => {
      state.open = false;
    },
    OPEN: (state: any, action: PayloadAction<any>) => {
      (state.open = true),
        (state.modalComponent = action.payload.modalComponent);
    },
  },
});

export const { OPEN, CLOSE } = ModalStateSlice.actions;

export default ModalStateSlice.reducer;
