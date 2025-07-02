import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from './redux/features/user/userSlice';
import {Routes, Route} from 'react-router-dom';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import AdminPanel from './pages/AdminPanel';
import UserDashboard from './pages/UserDashboard/UserDashboard';

const AppContent = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
useEffect(() => {
const storedUser = localStorage.getItem("user");
if(storedUser){
  dispatch(setUser(JSON.parse(storedUser)));
  navigate('/userdash');
}else{
  navigate('/signin');
}
},[])
  return (
    <div>
      <Routes>
        <Route path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
        <Route path='adminpanel' element={<AdminPanel />} />
        <Route path='userdash' element={<UserDashboard />} />
      </Routes>
    </div>
  )
}

export default AppContent