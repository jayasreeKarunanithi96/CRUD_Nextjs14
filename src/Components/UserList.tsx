/* eslint-disable @next/next/no-async-client-component */
"use client";
import { User } from "@/interface";
import { useState } from "react";
import { Button } from "@mui/material";

// Next.js fetch API in action
const usersData = [
  {
    id: 1,
    name: "John",
    email: "johndoe1234@gmail.com",
    linkedinURL: "johndoe",
    gender: "male",
    address: {
      line1: "123 Main St",
      line2: "Apt 4B",
      state: "California",
      city: "Los Angeles",
      pin: "90001",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith5678@gmail.com",
    linkedinURL: "janesmith",
    gender: "female",
    address: {
      line1: "456 Elm St",
      line2: "Suite 7C",
      state: "New York",
      city: "New York City",
      pin: "10001",
    },
  },
  {
    id: 3,
    name: "jayasree",
    email: "jsree1234@gmail.com",
    linkedinURL: "jjj",
    gender: "male",
    address: {
      line1: "line2",
      line2: "lin23",
      state: "tamil nadu",
      city: "chennai",
      pin: "6060210",
    },
  },
];

const UserList = async () => {
  const [expandedRows, setExpandedRows] = useState<any[]>([]);
  const handleRowClick = (rowId: any) => {
    const currentExpandedRows = expandedRows.includes(rowId)
      ? expandedRows.filter((id) => id !== rowId)
      : [...expandedRows, rowId];
    setExpandedRows(currentExpandedRows);
  };
  const handleClickEdit = (rowId: any) => {
    console.log('rowId',rowId)
    
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>LinkedIn URL</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((item: any) => (
          
              <tr key={item.name}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.linkedinURL}</td>
                <td>
                  {item.address.line1},{item.address.line2},{item.address.city},
                  {item.address.state}
                </td>
                <td>
                  <Button onClick={()=>handleClickEdit(item)}>Edit</Button> <Button>Delete</Button>
                  <Button>View</Button>
                </td>
              </tr>
           
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
