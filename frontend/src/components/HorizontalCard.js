import React, { useEffect, useState } from 'react';
import './HorizontalCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faEye, faEllipsisH, faShare, faEdit, faTrash, faWifi,faUnlink } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const backendUrl = process.env.REACT_APP_BACKEND_URL;


const HorizontalCard = ({ linkName, views, publish, lastupdated, linkid }) => {
  const navigate = useNavigate();
  const reftreshLinks = () => {
    window.location.reload();
  };

  const formattedDate = new Date(lastupdated).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  const url = `/shortview/${linkid}`;
  const pageurl = `/pageview/${linkid}`;

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleMenuClick = () => {
    console.log('Menu clicked');
  };

  const handleDelete = () => {
    
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log(`Deleting link '${linkName}'...`);
    setIsDeleteDialogOpen(false);
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
    };
    fetch(`${backendUrl}/delete-link/${linkid}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'success') {
          console.log(`Link '${linkName}' deleted successfully`);
          // Update the UI to remove the card
          reftreshLinks();

        } else {
          console.error(`Failed to delete link '${linkName}'`);
        }
      });

  };

  const handlepublish = () => {
    console.log(`Publishing link '${linkName}'...`);
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
    };
    fetch(`${backendUrl}/publish-link/${linkid}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'success') {
          console.log(`Link '${linkName}' published successfully`);
          // Update the UI to show the published status
          reftreshLinks();
        } else {
          console.error(`Failed to publish link '${linkName}'`);
        }
      });
  };

  const handleunpublish = () => {
    console.log(`Unpublishing link '${linkName}'...`);
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
    };
    fetch(`${backendUrl}/unpublish-link/${linkid}`, requestOptions)

      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'success') {
          console.log(`Link '${linkName}' unpublished successfully`);
          // Update the UI to show the unpublished status
          reftreshLinks();
        } else {
          console.error(`Failed to unpublish link '${linkName}'`);
        }
      });
  };


  const handleView = () => {
    navigate(`/shortview/${linkid}`);
  };
  const handlefullView = () => {
    navigate(`/pageview/${linkid}`);
  };

  const handleEdit = () => {
    navigate(`/edit/${linkid}`);
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
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
  const handlepageShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: pageurl,
        });
        console.log('Link shared successfully');
      } catch (error) {
        console.error('Error sharing link:', error);
      }
    } else {
      console.log('Web Share API not supported');
    }
  };



  return (
    <div className="horizontal-card">
      {isDeleteDialogOpen && (
        <div className="delete-dialog">
          <p>Are you sure you want to delete '{linkName}' link?</p>
          <button onClick={confirmDelete} className='confirm'>Delete</button>
          <button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</button>
        </div>
      )}
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
        <div className="lastupdated">
          Last updated on {formattedDate}
        </div>
        <div className="menu">
          <FontAwesomeIcon icon={faEllipsisH} onClick={handleMenuClick} />
          <div className="dropdown-content">
            <button onClick={handleView}>
              <FontAwesomeIcon icon={faEye} /> View
            </button>
            <button onClick={handlefullView}>
              <FontAwesomeIcon icon={faEye} /> Page View
            </button>
            <button onClick={handleShareClick}>
              <FontAwesomeIcon icon={faShare} /> Share Hub
            </button>
            <button onClick={handlepageShareClick}>
              <FontAwesomeIcon icon={faShare} /> Share Page
            </button>
            <button onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
            {publish ? (
              <button onClick={handleunpublish}>
                <FontAwesomeIcon icon={faUnlink} /> Unpublish</button>
            ) : (
              <button onClick={handlepublish}>
                <FontAwesomeIcon icon={faWifi} /> Publish
              </button>
            )}
            <button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
