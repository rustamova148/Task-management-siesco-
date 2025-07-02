import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom";
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import AdminPanel from './pages/AdminPanel';
import UserDashboard from './pages/UserDashboard';
import { useEffect } from 'react';
import { setUser } from './redux/features/user/userSlice';
import { useDispatch } from 'react-redux';

function App() {
const dispatch = useDispatch();
useEffect(() => {
const storedUser = localStorage.getItem("user");
if(storedUser){
  dispatch(setUser(JSON.parse(storedUser)));
}
},[])
  return (
    <HashRouter>
      <Routes>
        <Route path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
        <Route path='adminpanel' element={<AdminPanel />} />
        <Route path='userdash' element={<UserDashboard />} />
      </Routes>
    </HashRouter>
  )
}

export default App
