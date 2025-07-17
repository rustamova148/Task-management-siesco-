import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from './redux/features/user/userSlice';
import { Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent = () => {

const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(() => {
const storedUser = localStorage.getItem("user");
if(storedUser){
  dispatch(setUser(JSON.parse(storedUser)));
  navigate('/adminpanel');
}else{
  navigate('/signin');
}
},[])

  return (
    <div>
      <Routes>
        <Route path='signin' element={<Signin />} />
        <Route path='signup' element={<Signup />} />
        <Route element={<ProtectedRoute />} >
          <Route path='adminpanel' element={<AdminPanel />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppContent