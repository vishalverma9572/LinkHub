//not in use now
import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    async function registerfunction(e) {
        e.preventDefault();
        const response = await fetch(`${backendUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
        const data = await response.json();
        if(data.status ==="success"){
            navigate('/login');
        }
        console.log(data);
    }
  return (
    <>
        <h1>Register</h1>
        <form onSubmit={registerfunction}>
            <label>
                Full Name:
                <input type="text" name="name" value={name} 
                onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </label>    
            <label>
                Password:
                <input type="password" name="password" value={password} 
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">Register</button>
        </form>
    </>
  )
}
