/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/interface";
import usersData from "@/constant";

interface IDataSliceState {
  data: IUser[];
}

const initialState: IDataSliceState = {
  data: usersData,
};

const DataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    ADDUSER: (stateData: any, action: PayloadAction<IUser>) => {
      stateData.data.push(action.payload);
    },
    UPDATEUSER: (stateData: any, action: PayloadAction<IUser>) => {
      const {
        id,
        name,
        email,
        linkedinURL,
        gender,
        address: { line1, line2, state, city, pin },
      } = action.payload;
      const existingUser = stateData.data.find((user: IUser) => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
        existingUser.linkedinURL = linkedinURL;
        existingUser.gender = gender;
        existingUser.address.line1 = line1;
        existingUser.address.line2 = line2;
        existingUser.address.state = state;
        existingUser.address.city = city;
        existingUser.address.pin = pin;
      }
    },
    DELETEUSER: (stateData: any, action: PayloadAction<string | null>) => {
      if (action.payload !== null) {
        const existingUser = stateData.data.find(
          (user: IUser) => user.id === action.payload
        );
        if (existingUser) {
          existingUser.active = false;
        }
      }
    },
  },
});

export const { ADDUSER, UPDATEUSER, DELETEUSER } = DataSlice.actions;

export default DataSlice.reducer;
