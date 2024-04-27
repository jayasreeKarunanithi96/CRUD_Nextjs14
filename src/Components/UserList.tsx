/* eslint-disable @next/next/no-async-client-component */
"use client";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { IUser } from "@/interface";
import { OPEN } from "@/services/redux/ModalReducer";
import UserForm from "./UserForm";
import DeleteUserDialog from "@/Components/DeleteDialog";

const UserList = () => {
  const [data, setData] = useState<IUser[]>([]);
  const storeData = useSelector((state: any) => state.globalData.data);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  useEffect(() => {
    if (storeData?.length > 0) {
      const filterData = storeData?.filter((i: IUser) => i.active === true);
      setData(filterData);
    }
  }, [storeData]);

  console.log("storeData", storeData);
  // Handle Edit
  const handleClickEdit = (rowId: any) => {
    params.set("action", "edit");
    params.set("id", rowId?.id);
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
    dispatch(OPEN({ modalComponent: <UserForm /> }));
  };
  // Handle Edit
  const handleClickDelete = (rowId: any) => {
    params.set("action", "delete");
    params.set("id", rowId?.id);
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
    dispatch(OPEN({ modalComponent: <DeleteUserDialog /> }));
  };
  const handleClickView = (rowId: any) => {
    params.set("action", "view");
    params.set("id", rowId?.id);
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(updatedPath);
    dispatch(OPEN({ modalComponent: <UserForm /> }));
  };

  return (
    <>
      {data.length > 0 ? (
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
            {data.map((item: IUser) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.linkedinURL}</td>
                <td>
                  {item.address.line1},{item.address.line2},{item.address.city},
                  {item.address.state}, {item.address.pin}
                </td>
                <td>
                  <Button onClick={() => handleClickEdit(item)}>Edit</Button>{" "}
                  <Button onClick={() => handleClickDelete(item)}>
                    Delete
                  </Button>
                  <Button onClick={() => handleClickView(item)}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <CircularProgress color="success" />
      )}
    </>
  );
};

export default UserList;
