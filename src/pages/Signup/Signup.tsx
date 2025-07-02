import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
// import styles from './Signup.module.css'
// import { useNavigate } from "react-router-dom";

const Signup = () => {
// const navigate = useNavigate();
const [userData, setUserData] = useState({
  name: "",
  email: "",
  password: "",
  orgname: "",
  orgnumber: "",
  orgaddress: "",
  orgId: uuidv4(),
});
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setUserData(prev => ({
  ...prev,
  [e.target.name]: e.target.value
}));
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      orgname: userData.orgname,
      orgnumber: userData.orgnumber,
      orgaddress: userData.orgaddress,
      orgId: userData.orgId,
      role: "admin",
    }),
    });

    if (res.ok) {
      alert("Qeydiyyat uğurla tamamlandı");
      // navigate('/adminpanel');
    }else{
      alert("Xəta baş verdi");
    }
    } catch (error) {
      alert("Serverle əlaqə yoxdur");
  }
};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Təşkilat məlumatları</h2>
          <label htmlFor="oad">Ad:</label> <br />
          <input
            type="text"
            name="orgname"
            id="oad"
            value={userData.orgname}
            onChange={handleChange}
            required
          />{" "}
          <br /> <br />
          <label htmlFor="number">Tel:</label> <br />
          <input
            type="number"
            name="orgnumber"
            id="number"
            value={userData.orgnumber}
            onChange={handleChange}
            required
          />{" "}
          <br /> <br />
          <label htmlFor="address">Ünvan:</label> <br />
          <input
            type="text"
            name="orgaddress"
            id="address"
            value={userData.orgaddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <h2>İstifadəçi məlumatları</h2>
          <label htmlFor="iad">Ad:</label> <br />
          <input
            type="text"
            name="name"
            id="iad"
            value={userData.name}
            onChange={handleChange}
            required
          />{" "}
          <br /> <br />
          <label htmlFor="email">Email:</label> <br />
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            required
          />{" "}
          <br /> <br />
          <label htmlFor="password">Şifrə:</label> <br />
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <a href="/#/signin">Sign in</a> <br /> <br />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
