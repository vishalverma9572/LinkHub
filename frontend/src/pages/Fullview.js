import React, { useEffect } from 'react'

export default function Fullview() {
    const [notfound, setnotfound] = React.useState(false);
    useEffect(() => {
        document.title = "Link View | LinkHub"
        //fetching the link details
        const linkid = window.location.pathname.split('/')[2]
        const fetchData = async () => {
            const response = await fetch(`http://localhost:4500/linkview/${linkid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    
                },
            })
            const data = await response.json()
            console.log(data)
            if (data.status === "failed") {
                // Redirect to login if token is invalid or expired
                setnotfound(true);
            }
            
        }
        
    }, [])

  return (
    
  )
}
