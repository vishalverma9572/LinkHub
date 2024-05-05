import './App.css';
import Register from './pages/Register';
import { Route, Routes, useNavigate } from "react-router-dom";
import Shortview from './pages/Shortview';




import Authorise from './pages/Authorise';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Create from './pages/Create';
import Edit from './pages/Edit';
import NotFound404 from './pages/NotFound404';
import Fullview from './pages/Fullview';
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/passwordReset';


function App() {
  const Navigate = useNavigate();
  function logout() {
    localStorage.removeItem('token');
    Navigate('/')
  }
  return (
    <>
    <Routes>
      <Route path="/signup" element={<Authorise up={true} />} />
      <Route path="/signin" element={<Authorise up={false}/>} />
      
      <Route path="/" element={<Home />} />
      
      <Route path="/dashboard" element={<Dashboard 
      logoutfun={logout}
      />} />
      <Route path='/profile' element={<Profile logoutfun={logout}/>} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:linkid" element={<Edit/>} />
      <Route path="/shortview/:linkid" element={<Shortview/>} />
      {/* <Route path="/" element={<Preview/>} /> */}

      {/* <Route path="/preview" element={<Preview />} /> */}
      {/* <Route path="/preview" element={<Preview />}  /> */}

      <Route path='/pageview/:linkid' element={<Fullview/>} />
      <Route path="*" element={<NotFound404/>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/set-password/:token" element={<PasswordReset />} />
    </Routes>
    
      
    </> 
  );
}

export default App;
