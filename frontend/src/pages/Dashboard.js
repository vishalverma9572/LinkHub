import React, { useEffect } from 'react';

export default function Dashboard(props) {

  

  const [data, setData] = React.useState(null);
  useEffect(() => {

    async function fetchData() {
      // Fetch data from the backend endpoint with Authorization header
      const response = await fetch('http://localhost:4500/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}` // Include Bearer token
        }
      });



      // Parse the JSON response
      const data = await response.json();
    //   console.log(data);
      setData(data);
      if (data.status === 'failed') {
        // Redirect to login if token is invalid or expired
        window.location.href = '/signin';
      }
      // Handle the fetched data here (e.g., update state)
    }
    if(localStorage.getItem('token') === null){
      window.location.href = '/signin';
    }
    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleLogout = () => {
    props.logoutfun();
  };
  return (
    <>
      <h1>Dashboard</h1>
      {data && data.status === 'success' && (
        <p>Welcome to the Dashboard, {data.user.name}!</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
