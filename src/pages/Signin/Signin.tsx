import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";

const Signin = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const dispatch = useDispatch();

const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
setEmail(e.target.value);
}
const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
setPassword(e.target.value);
}
localStorage.setItem("useremail",email);
localStorage.setItem("userpassword",password);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
let useremail = localStorage.getItem("useremail");
let userpassword = localStorage.getItem("userpassword");
try {
  const res = await fetch(`http://localhost:3001/users?email=${useremail}&password=${userpassword}`);
  const data = await res.json();
  
  if(data.length > 0){
    const user = data[0];
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(setUser(user));
    alert('Uğurla hesabınıza daxil oldunuz');
    navigate('/userdash');
  }else{
    alert('Belə bir istifadəçi tapılmadı');
  }
} catch (error) {
  console.error(error);
}
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input type="email" name="email" id="email" required value={email} onChange={handleChange1} /> <br /> <br />
      <input type="password" name="password" id="password" value={password} onChange={handleChange2}
      pattern="^[a-zA-Z0-9]{6,}$" title="Şifrə ən az 6 hərf və ya rəqəmdən ibarət olmalıdır"
      required/> <br /> <br />
      <a href="/#/signup">Qeydiyyatdan keçin</a> <br /> <br />
      <button type="submit">Sign in</button>
      </form>
    </div>
  )
}

export default Signin