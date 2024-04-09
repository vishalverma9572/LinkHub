import React from 'react';
import './HorizontalCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faEye, faEllipsisH, faShare, faEdit, faTrash, faWifi, faWifiSlash } from '@fortawesome/free-solid-svg-icons';


const HorizontalCard = ({ linkName, views,publish, }) => {
  const handleMenuClick = () => {
    // Handle click event for menu options (view, share, edit, delete, publish)
    // Implement your logic here
    console.log('Menu clicked');
  };

  return (
    <div className="horizontal-card">
      <div className="card-content">
        <div className="icon">
          <FontAwesomeIcon icon={faLink} />
        </div>
        <div className="link-details">
          <span className="link-name">{linkName}</span>
          <div className="views">
            <FontAwesomeIcon icon={faEye} className="eye-icon" />
            <span>{views} views</span>
          </div>
        </div>
        <div className="menu">
          <FontAwesomeIcon icon={faEllipsisH} onClick={handleMenuClick} />
          {/* Dropdown menu options */}
          <div className="dropdown-content">
            <button><FontAwesomeIcon icon={faEye} /> View</button>
            <button><FontAwesomeIcon icon={faShare} /> Share</button>
            <button><FontAwesomeIcon icon={faEdit} /> Edit</button>
            <button><FontAwesomeIcon icon={faTrash} /> Delete</button>
            {publish ? <button> Unpublish</button> : 
            <button><FontAwesomeIcon icon={faWifi} /> Publish</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
