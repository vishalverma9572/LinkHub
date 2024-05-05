import React, { useState } from 'react';
import './Rowcard.css'; // Import CSS file for styling (see below)
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegShareSquare } from "react-icons/fa";



const RowCard = ({  text, url }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = `https://www.google.com/s2/favicons?sz=64&domain=${url}`;
  //crop text if too long
  if (text.length > 50) {
    text = text.substring(0, 50) + '...';
  }
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const  handleShare = async() => {
    if (navigator.share) {
        try {
          await navigator.share({
            title: text,
            url: url,
          });
          console.log('Link shared successfully');
        } catch (error) {
          console.error('Error sharing link:', error);
        }
      } else {
        console.log('Web Share API not supported');
      }
  };
  const handleClick = () => {
    window.open(url, '_blank');
  }
  return (
    <div
      className="row-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img className="row-card-image" src={imageUrl} alt="Card" />
      <p className="row-card-text">{text}</p>
      {isHovered && (
        <div className="row-card-actions">
          <button className="action-button" onClick={handleShare}><FaRegShareSquare/></button>
        </div>
      )}
    </div>
  );
};

export default RowCard;
