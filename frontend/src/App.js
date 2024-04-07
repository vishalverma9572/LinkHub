import './App.css';
import Register from './pages/Register';
import { Route, Routes, useNavigate } from "react-router-dom";

import Authorise from './pages/Authorise';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';


function App() {
  const Navigate = useNavigate();
  function logout() {
    localStorage.removeItem('token');
    Navigate('/signin')
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
    </Routes>
    
      
    </> 
  );
}

export default App;
