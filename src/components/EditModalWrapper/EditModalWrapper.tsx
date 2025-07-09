import Modal from "../Modal/Modal";
import type { User } from "../../pages/AdminPanel/AdminPanel";
import styles from "./EditModalWrapper.module.css";
import { useState, useEffect } from "react";

const EditModalWrapper = ({
  setEditUserModal,
  userId,
  setUsers,
  setOpenUserMenuId
}: {
  setEditUserModal: (value: boolean) => void;
  userId: number | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setOpenUserMenuId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {

  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    orgname: "",
    username: "",
    useremail: "",
    userpassword: "",
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        orgname: userToEdit.orgname,
        username: userToEdit.name,
        useremail: userToEdit.email,
        userpassword: userToEdit.password,
      });
    }
  }, [userToEdit]);

  useEffect(() => {
    const fetchUserById = async (id: number) => {
      try {
        const res = await fetch(`http://localhost:3001/users/${id}`);
        if (!res.ok) throw new Error("User not found");
        const user = await res.json();
        setUserToEdit(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserToEdit(null);
      }
    };

    if (userId !== null) {
      fetchUserById(userId);
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userId === null) return;

    try {
      const res = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orgname: formData.orgname,
          name: formData.username,
          email: formData.useremail,
          password: formData.userpassword,
        }),
      });
      const updatedUser = await res.json();
      if (res.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userId ? updatedUser : user))
        );
        setEditUserModal(false);
        setOpenUserMenuId(null);
      } else {
        alert("Error updating user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Connection error");
    }
  };

  return (
    <Modal setEditUserModal={setEditUserModal} setOpenUserMenuId={setOpenUserMenuId}>
      <form className={styles.edit_user_form} onSubmit={handleEditUser}>
        <label htmlFor="orgname">Organization name:</label>
        <input
          type="text"
          name="orgname"
          id="orgname"
          value={formData.orgname}
          className={styles.edit_input}
          onChange={handleChange}
        />

        <label htmlFor="username">User Name:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          className={styles.edit_input}
          onChange={handleChange}
        />

        <label htmlFor="useremail">User Email:</label>
        <input
          type="email"
          name="useremail"
          id="useremail"
          value={formData.useremail}
          className={styles.edit_input}
          onChange={handleChange}
        />

        <label htmlFor="userpassword">User Password:</label>
        <input
          type="password"
          name="userpassword"
          id="userpassword"
          value={formData.userpassword}
          className={styles.edit_input}
          onChange={handleChange}
        />

        <button type="submit" className={styles.edit_user_submit}>
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default EditModalWrapper;
