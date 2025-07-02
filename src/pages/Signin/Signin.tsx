import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import styles from './Signin.module.css'

const Signin = () => {
const [email, setEmail] = useState("");
const navigate = useNavigate();

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setEmail(e.target.value);
}
localStorage.setItem("useremail",email);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
let useremail = localStorage.getItem("useremail");
try {
  const res = await fetch(`http://localhost:3001/users?email=${useremail}`);
  const data = await res.json();
  console.log(data[0]);
  if(data.length > 0){
    navigate('/userdash');
  }else{
    alert('Belə bir emaili olan istifadəçi tapılmadı');
  }
} catch (error) {
  console.error(error);
}

}
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input type="email" name="email" id="email" required value={email} onChange={handleChange} /> <br /> <br />
      <input type="password" name="password" id="password" 
      pattern="^[a-zA-Z0-9]{6,}$" title="Şifrə ən az 6 hərf və ya rəqəmdən ibarət olmalıdır"
      required/> <br /> <br />
      <button type="submit">Sign in</button>
      </form>
    </div>
  )
}

export default Signin