import { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./UsersModalWrapper.module.css";
import type { User } from "../../pages/AdminPanel/AdminPanel";

const UsersModalWrapper = ({setUserModal,setUsers}:{ setUserModal: (value: boolean) => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
 }) => {

type FormDataType = {
    orgname: string;
    username: string;
    useremail: string;
    userpassword: string;
}
const [formData, setFormData] = useState<FormDataType>({
    orgname: "",
    username: "",
    useremail: "",
    userpassword: "",
})

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
}))
}

const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
        const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            orgname: formData.orgname,
            name: formData.username,
            email: formData.useremail,
            password: formData.userpassword,
            role: "user",
        })
    })

    if(res.ok){
        const newUser = await res.json();
        setUsers((prev) => [...prev, newUser]);
        setUserModal(false);
    }else{
        alert("Error when adding user");
        setUserModal(false);
    }
    } catch(error){
      alert("No connection with server");
    }
}
  return (
    <Modal setUserModal={setUserModal}>
      <form className={styles.users_form} onSubmit={handleAddUser}>
        <label htmlFor="orgname">Organization name:</label> 
        <input type="text" name="orgname" id="orgname" className={styles.users_input} 
        onChange={handleChange} /> 

        <label htmlFor="username">User Name:</label> 
        <input type="text" name="username" id="username" className={styles.users_input}
        onChange={handleChange} /> 

        <label htmlFor="useremail">User Email:</label>
        <input type="email" name="useremail" id="useremail" className={styles.users_input} 
        onChange={handleChange} /> 

        <label htmlFor="userpassword">User Password:</label>
        <input type="password" name="userpassword" id="userpassword" className={styles.users_input} 
        onChange={handleChange} /> 

        <button type="submit" className={styles.add_user_submit}>Submit</button>
      </form>
    </Modal>
  );
};

export default UsersModalWrapper;