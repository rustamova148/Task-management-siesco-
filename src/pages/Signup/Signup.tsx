import { useState } from "react";
import styles from "./Signup.module.css";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    orgname: "",
    orgnumber: "",
    orgaddress: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("https://task-management-siesco-13-backend.onrender.com/users", {
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
          role: "admin",
        }),
      });

      if (res.ok) {
        alert("Qeydiyyat uğurla tamamlandı");
      } else {
        alert("Xəta baş verdi");
      }
    } catch (error) {
      alert("Serverlə əlaqə yoxdur");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h2>Təşkilat məlumatları</h2>

          <label htmlFor="oad">Ad:</label>
          <input
            type="text"
            name="orgname"
            id="oad"
            value={userData.orgname}
            onChange={handleChange}
            required
          />

          <label htmlFor="number">Tel:</label>
          <input
            type="number"
            name="orgnumber"
            id="number"
            value={userData.orgnumber}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">Ünvan:</label>
          <input
            type="text"
            name="orgaddress"
            id="address"
            value={userData.orgaddress}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.section}>
          <h2>İstifadəçi məlumatları</h2>

          <label htmlFor="iad">Ad:</label>
          <input
            type="text"
            name="name"
            id="iad"
            value={userData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Şifrə:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ flexBasis: "100%", textAlign: "left"  }}>
          <a href="/#/signin" className={styles.linkSignin}>
            Daxil olun
          </a> <br />
          <button type="submit" className={styles.submitButton}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

