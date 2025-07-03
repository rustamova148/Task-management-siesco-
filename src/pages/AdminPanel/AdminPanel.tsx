import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import styles from "./AdminPanel.module.css";
import UsersModalWrapper from "../../components/UsersModalWrapper/UsersModalWrapper";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    orgname: string;
    orgnumber: number;
    orgaddress: string;
    orgId: number;
    role: string;
}

const AdminPanel = () => {
const [userModal, setUserModal] = useState(false);
const [users, setUsers] = useState<User[]>([]);
const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3001/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const showUserModal = () => {
      setUserModal(true);
  }
  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  }
  const handleDeleteUser = async (id:number) => {
    try{
     const res = await fetch(`http://localhost:3001/users/${id}`,{
      method: "DELETE",
     });

     if(res.ok){
      setUsers((prev) => prev.filter(user => user.id !== id));
      setOpenMenuId(null);
     }else{
      alert("Error when deleting user");
     }
    }catch(error){
      alert("No connection with server");
      console.error("Error deleting user:", error);
    }
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
              <th>User password</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.orgname}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td className={styles.actions_td}>
                  <button className={styles.actions_btn} onClick={() => toggleMenu(user.id)}>
                    <i className={`fa-solid fa-ellipsis ${styles.icon}`}></i>
                  </button>
                  {openMenuId === user.id && (
                  <ul className = {styles.actions_options}>
                    <li>
                      <button className={styles.actions_option}>
                      <i className="fa-solid fa-pen"></i>
                      <span>Edit</span>
                      </button>
                    </li>
                    <li>
                      <button className={styles.actions_option} onClick={() => handleDeleteUser(user.id)}>
                      <i className="fa-solid fa-trash"></i>
                      <span>Delete</span>
                      </button>
                    </li>
                  </ul>
                )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {userModal && <UsersModalWrapper setUserModal={setUserModal} setUsers={setUsers} />}
    </div>
  );
};

export default AdminPanel;
