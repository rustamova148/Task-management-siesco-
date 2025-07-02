import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom";
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import AdminPanel from './pages/AdminPanel';
import UserDashboard from './pages/UserDashboard';

function App() {

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
