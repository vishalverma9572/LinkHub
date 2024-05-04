import './App.css';
import Register from './pages/Register';
import { Route, Routes, useNavigate } from "react-router-dom";

import Authorise from './pages/Authorise';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Create from './pages/Create';
import Edit from './pages/Edit';


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
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
    
      
    </> 
  );
}

export default App;
