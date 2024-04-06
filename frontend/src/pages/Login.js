import React from 'react'

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    async function loginfunction(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:4500/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await response.json();
        console.log(data);
        if(data.status =="success"){
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard';
        }
    }
  return (
    <>
    <h1>Login</h1>
    <form onSubmit={loginfunction}>
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
        <button type="submit">Login</button>
    </form>
    </>
  )
}