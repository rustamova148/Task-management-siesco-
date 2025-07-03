// import { useState, useEffect } from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./AdminPanel.module.css";
import UsersModalWrapper from "../../components/UsersModalWrapper/UsersModalWrapper";

const AdminPanel = () => {
const [userModal, setUserModal] = useState(false);
// const [users, setUsers] = useState<User[]>([]);

  // interface User {
  //   id: number;
  //   name: string;
  //   email: string;
  //   password: string;
  //   orgname: string;
  //   orgnumber: number;
  //   orgaddress: string;
  //   orgId: number;
  //   role: string;
  // }

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3001/users");
  //       const data = await res.json();
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  const showUserModal = () => {
      setUserModal(true);
  }
  return (
    <div className={styles.admin_panel_container}>
      <Header />
      <button className={styles.adduserbtn} onClick={showUserModal}>
        Add user
      </button>
      <div className={styles.admin_table_container}>
        <table className={styles.admin_table}>
          <thead>
            <tr>
              <th>Organization name</th>
              <th>User name</th>
              <th>User email</th>
            </tr>
          </thead>
          {/* <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.orgname}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
      {userModal && <UsersModalWrapper setUserModal={setUserModal} />}
    </div>
  );
};

export default AdminPanel;
