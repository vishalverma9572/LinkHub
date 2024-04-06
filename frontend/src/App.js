import './App.css';
import Register from './pages/Register';
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


function App() {
  function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard 
      logoutfun={logout}
      />} />
    </Routes>
    
      
    </> 
  );
}

export default App;
