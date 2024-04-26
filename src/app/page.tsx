"use client"
import { Suspense ,useState} from "react";
import { UseSelector,useDispatch } from "react-redux";
import { OPEN } from "@/services/redux/ModalReducer";
import styles from "./page.module.css";
import UserList from "@/Components/UserList";
import UserModal from "@/Components/UserModal";
import UserForm from "@/Components/UserForm"
import { Button } from "@mui/material";

export default function Home() {
  const  dispatch=useDispatch()
  const handleAddUser=()=>{
    console.log('handleAddUser')
    dispatch(OPEN({"modalComponent":<UserForm/>}))

  }
  return (
    <main className={styles.main}>
      <div>
        <h1>User table</h1>
      </div>
      <div className={styles.userForm}>
        <Button  variant='contained' onClick={()=>handleAddUser()}>Add user</Button>
      
      </div>

      <Suspense fallback={"loading"}>
        <UserList />
      </Suspense>
      <UserModal/>
      {/* <UserModal><UserForm/></UserModal> */}
    </main>
  );
}
