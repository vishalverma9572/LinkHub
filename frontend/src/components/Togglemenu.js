import React from 'react'
import { useState } from 'react';


export default function Togglemenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleShare = () => {
    // Implement sharing functionality
    console.log("Sharing...");
  };
  
  const handleReport = () => {
    // Implement reporting functionality
    console.log("Reporting...");
  };
  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

return (
  <>
    {/* Other content */}
    {menuOpen && (
      <div className="dropdown-menu">
        <button onClick={handleShare}>Share</button>
        <button onClick={handleReport}>Report</button>
      </div>
    )}
  </>
);

}

