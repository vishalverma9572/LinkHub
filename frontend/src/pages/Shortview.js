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

import  toggleMenu  from "../components/Togglemenu";
import Loader from "../components/Loader";
// import './Shortview.css'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function Shortview() {
  
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
  useEffect(() => {
    document.title = "View | LinkHub";
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/view-link/${linkid}`
        );
        const data = await response.json();
        if (data.status == "success") {
          setData(data.content);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }

        console.log(data.content);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
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
          {Loading? <h3 style={{marginTop:"-20px" ,fontFamily: "'Raleway', sans-serif", fontWeight:500,color:'white'}} >Loading...</h3>:
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


          </div>}
        </div>
      ) : (
        <NotFound404 />
      )}
    </>
  );
}
