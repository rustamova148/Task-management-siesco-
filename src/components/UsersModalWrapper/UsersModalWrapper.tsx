import { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./UsersModalWrapper.module.css";
import type { User } from "../../pages/AdminPanel/AdminPanel";

const UsersModalWrapper = ({setUserModal,setUsers,setOpenMenuId}:{ setUserModal: (value: boolean) => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>> ;
  setOpenMenuId: React.Dispatch<React.SetStateAction<number | null>>
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

const [errors, setErrors] = useState<{ [key: string]: string }>({});

const validate = () => {
  const newErrors: { [key: string]: string } = {};

  if (!formData.orgname.trim()) {
    newErrors.orgname = "Organization name is required";
  }
  if (!formData.username.trim()) {
    newErrors.username = "User name is required";
  }
  if (!formData.useremail.trim()) {
    newErrors.useremail = "Email is required";
  }
  if (!formData.userpassword.trim()) {
    newErrors.userpassword = "Password is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
}))
}

const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
    return; 
    }
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
    }catch(error){
      alert("No connection with server");
    }
}
  return (
    <Modal setUserModal={setUserModal} setOpenMenuId={setOpenMenuId}>
      <form className={styles.users_form} onSubmit={handleAddUser}>
        <label htmlFor="orgname">Organization name:</label> 
        <input type="text" name="orgname" id="orgname" className={`${styles.users_input} ${errors.orgname ? styles.error : ""}`}
        onChange={handleChange} /> 
        {errors.orgname && <span style={{color: "red", fontSize:"11px", marginTop: "-10px"}}>{errors.orgname}</span>}

        <label htmlFor="username">User Name:</label> 
        <input type="text" name="username" id="username" className={`${styles.users_input} ${errors.username ? styles.error : ""}`}
        onChange={handleChange} /> 
        {errors.username && <span style={{color: "red", fontSize:"11px", marginTop: "-10px"}}>{errors.username}</span>}

        <label htmlFor="useremail">User Email:</label>
        <input type="email" name="useremail" id="useremail" className={`${styles.users_input} ${errors.useremail ? styles.error : ""}`}
        onChange={handleChange} /> 
        {errors.useremail && <span style={{color: "red", fontSize:"11px", marginTop: "-10px"}}>{errors.useremail}</span>}

        <label htmlFor="userpassword">User Password:</label>
        <input type="password" name="userpassword" id="userpassword" className={`${styles.users_input} ${errors.userpassword ? styles.error : ""}`} 
        onChange={handleChange} /> 
        {errors.userpassword && <span style={{color: "red", fontSize:"11px", marginTop: "-10px"}}>{errors.userpassword}</span>}

        <button type="submit" className={styles.add_user_submit}>Submit</button>
      </form>
    </Modal>
  );
};

export default UsersModalWrapper;