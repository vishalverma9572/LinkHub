import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import RowCard from "../components/Rowcard";
import NotFound404 from "./NotFound404";
import { LuGithub } from "react-icons/lu";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";
import { CiPhone } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import "./Shortview.css";
import logo from "../images/linkhub-high-resolution-logo-transparent.png";
import { FaEllipsisV } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const backendUrl = process.env.REACT_APP_BACKEND_URL;


// import  toggleMenu  from "../components/Togglemenu";
import './Shortview.css'

export default function Preview() {
  const { linkid } = useParams();

  const [Data, setData] = useState({
    _id: "6636916f13298e5a80b72655",
    linkid: "lvsiq6ae",
    views: 15,
    name: "link",
    published: true,
    bioHtml: "",
    createdAt: "2024-05-04T19:50:07.022Z",
    email: "",
    github: "",
    hyperlinks: [],
    insta: "",
    lastupdated: "2024-05-04T19:50:07.022Z",
    phoneNumber: "",
    profileImage: "",
    x: "",
    yt: "",
  });
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const parseAndSetFormData = () => {
      if (formDataParam) {
        try {
          const decodedFormData = decodeURIComponent(formDataParam);
          const parsedFormData = JSON.parse(decodedFormData);
          setFormData(parsedFormData);
        } catch (error) {
          console.error('Error parsing formdata:', error);
        }
      }
    };

    parseAndSetFormData();
  }, [formDataParam]);
//   useEffect(() => {
//     document.title = "Preview | LinkHub";
//     async function fetchData() {
//       // Fetch data from the backend endpoint with Authorization header
//       const response = await fetch(`${backendUrl}/dashboard`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${localStorage.getItem("token")}`, // Include Bearer token
//         },
//       });

//       // Parse the JSON response
//       const data = await response.json();
//       console.log(data);
      
//       if (data.status === "failed") {
//         // Redirect to login if token is invalid or expired
//         window.location.href = "/signin";
//       }
//       // Handle the fetched data here (e.g., update state)
//       //fetching filedta object from prarama
//         //
//         const getFormDataFromURL = () => {
//             const searchParams = new URLSearchParams(window.location.search);
//             const formDataParam = searchParams.get('formdata');
          
//             if (formDataParam) {
//               try {
//                 const formDataObject = JSON.parse(decodeURIComponent(formDataParam));
//                 setData(formDataObject);
//                 console.log('Form data:', formDataObject);
//               } catch (error) {
//                 console.error('Error parsing formdata:', error);
//               }
//             }
//           };
          
//           // Call the function when the component mounts
//           getFormDataFromURL();
//     }
          
//     if (localStorage.getItem("token") === null) {
//       window.location.href = "/signin";
//     }
//     fetchData(); // Call the fetchData function when the component mounts
//   }, []);
   // Empty dependency array ensures this effect runs only once on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `${backendUrl}/view-link/${linkid}`
//         );
//         const data = await response.json();
//         if (data.status == "success") {
//           setData(data.content);
//           setLoading(false);
//         } else {
//           setError(true);
//           setLoading(false);
//         }

//         console.log(data.content);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);
  const { email, github, yt, insta, x, phoneNumber } = Data;
  return (
    <>
      {!Error ? (
                <div className="Shortview_page">
                    {/* <div className="header">
      
        <div className="actions">
            <BsThreeDots onClick={toggleMenu} />
        </div>
        </div> */}
          <div className="Container">
            <div className="img_ctn">
              {Data.profileImage && (
                <img src={Data.profileImage} alt="profile" />
              )}
            </div>
            <div className="name_ctn">
              <h1>@{Data.name}</h1>
            </div>
            
            <div className="default_links">
              {/* //showing only icons in a row */}

              {email && (
                <a
                  href={`mailto:${email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <CiMail />
                </a>
              )}
              {github && (
                <a
                  href={`https://github.com/${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LuGithub />
                </a>
              )}
              {yt && (
                <a
                  href={`https://youtube.com/${yt}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineYoutube />
                </a>
              )}
              {insta && (
                <a
                  href={`https://instagram.com/${insta}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              )}
              {x && (
                <a
                  href={`https://twitter.com/${x}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter />
                </a>
              )}
              {phoneNumber && (
                <a
                  href={`tel:${phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CiPhone />
                </a>
              )}
            </div>
            <div className="rowcard_container">
              {Data.hyperlinks.map((link) => (
                <RowCard
                  imageUrl={`https://www.google.com/s2/favicons?sz=64&domain=${link.url}`}
                  text={link.name}
                  url={link.url}
                />
              ))}
            </div>

            <div className="footer">
                <Link to={"/"}><img src={logo} alt="logo"/>Create Your LinkHub</Link>
                
            </div>


          </div>
        </div>
      ) : (
        <NotFound404 />
      )}
    </>
  );
}
