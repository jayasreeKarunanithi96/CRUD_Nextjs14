
import { Suspense } from "react";
import styles from "./page.module.css";
import AddButton from '../Components/AddButton'
import UserList from "@/Components/UserList";
import UserModal from "@/Components/UserModal";


export default function Home() {
  
  return (
    <main className={styles.main}>
      <div>
        <h1>User table</h1>
      </div>
      <div className={styles.userForm}>
       <AddButton/>
      </div>

      <Suspense fallback={"loading"}>
        <UserList />
      </Suspense>
      <UserModal/>
      {/* <UserModal><UserForm/></UserModal> */}
    </main>
  );
}
