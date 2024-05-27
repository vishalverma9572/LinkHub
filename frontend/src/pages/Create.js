import React, { useEffect, useState, useRef } from "react"; // Import useEffect from react
import "./Create.css";
import profileIcon from "../images/user-profile-icon.png";
import edit from "../images/edit.png";
import instagramIcon from "../images/insta_blackwhite.png";
import xlogo from "../images/xlogo.png";
import plusIcon from "../images/plus.png";
import yt from "../images/yticon.png";
import github from "../images/github.png";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import x from "../images/x_icon.png";
import add from "../images/add.png";
import cross from "../images/cross.png";
import Text from "./Text";

import question from "../images/question_mark.png";
import tick from "../images/tickmark.png";
import { FaPencil, FaEnvelope, FaPhone } from "react-icons/fa6";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import axios from "axios";
import uniqid from "uniqid";
import Loader from "../components/Loader";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function () {
  const [Loading,setLoading]=React.useState(false);
  const [existednames, setExistednames] = React.useState(null);
  const [alreadyExists, setAlreadyExists] = React.useState(false);
  const [quillvalue, setQuillValue] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  useEffect(() => {
    document.title = "Create | LinkHub";
    async function fetchData() {
      // Fetch data from the backend endpoint with Authorization header
      const response = await fetch(`${backendUrl}/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`, // Include Bearer token
        },
      });

      // Parse the JSON response
      const data = await response.json();
      console.log(data.user.userLinks.map((link) => link.name));
      // setData(data);
      setExistednames(data.user.userLinks.map((link) => link.name));
      if (data.status === "failed") {
        // Redirect to login if token is invalid or expired
        window.location.href = "/signin";
      }
      // Handle the fetched data here (e.g., update state)
    }
    if (localStorage.getItem("token") === null) {
      window.location.href = "/";
    }
    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const [urls, setUrls] = useState([]);
  const [favicons, setFavicons] = useState([]);
  const uuid = uniqid();
  const [formData, setFormData] = useState({
    linkid: "",
    published: false,
    name: "",
    email: "",
    phoneNumber: "",
    bioHtml: "",
    github: "",
    x: "",
    yt: "",
    insta: "",
    hyperlinks: [],
    profileImage: "",
  });
  useEffect(() => {
    if (existednames) {
      if (existednames.includes(formData.name)) {
        setAlreadyExists(true);
      } else {
        setAlreadyExists(false);
      }
    }
  }, [formData.name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uuid = uniqid();
    try {
      // Send form data to server using Axios
      // await axios.post("/api/formdata", formData);
      setLoading(true);
      if (alreadyExists) {
        alert("Alias of this name already exists");
        setLoading(false);
        return;
      }
      alert("Form data submitted successfully");
      let tosaveformdata = {
        ...formData,
        linkid: uuid,
        bioHtml: quillvalue,
        hyperlinks: urls.map((url, i) => ({
          name: names[i] || `Link ${i + 1}`,
          url: url,
        })),
      };
      let x = JSON.stringify(tosaveformdata);
      console.log("datatype of x is", x);
      const response = await fetch(`${backendUrl}/create-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`, // Include Bearer token
        },
        body: JSON.stringify(tosaveformdata),
      });
      const data = await response.json();

      if (data.status === "failed") {
        // Redirect to login if token is invalid or expired
        
        window.location.href = "/signin";
        setLoading(false);

      }
      if (data.status === "success") {
        window.location.href = "/dashboard";
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      //
      let message = "Error submitting form data";
      //setting message for payload large
      if (error.message.includes("413")) {
        alert("Payload too large");
      } else {
        alert(`${message}`);
      }
      setLoading(false);
    }
  };

  const handleVariation = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [names, setNames] = useState([]);
  const handleInputChange = (e, index) => {
    const inputUrl = e.target.value;
    const newUrls = [...urls];
    newUrls[index] = inputUrl;
    setUrls(newUrls);

    const inputName = names[index] || `Link ${index + 1}`; // Use the name from state or generate a default one
    const newNames = [...names];
    newNames[index] = inputName;
    setNames(newNames);

    const newHyperlinks = newUrls.map((url, i) => ({
      name: newNames[i] || `Link ${i + 1}`,
      url: url,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      hyperlinks: newHyperlinks,
    }));

    const newFavicon = inputUrl
      ? `https://www.google.com/s2/favicons?sz=64&domain=${inputUrl}`
      : "";
    const newFavicons = [...favicons];
    newFavicons[index] = newFavicon;
    setFavicons(newFavicons);
  };
  const handleSelectImage = () => {
    const inputFile = document.querySelector("#file");
    inputFile.click();
  };

  const [val, setVal] = useState([]);
  const handleAdd = () => {
    setUrls([...urls, ""]);
    setFavicons([...favicons, ""]);
  };

  const handleDelete = (index) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);
    const newFavicons = [...favicons];
    newFavicons.splice(index, 1);
    setFavicons(newFavicons);
  };
  const handleChange = (onChangeValue, i) => {
    const inputdata = [...val];
    inputdata[i] = onChangeValue.target.value;
    setVal(inputdata);
  };

  const handleFileChange = (event) => {
    const inputFile = event.target;
    const imgArea = document.querySelector(".img-area");
    const image = inputFile.files[0];

    if (image && image.size < 15000000) {
      const reader = new FileReader();
      reader.onload = () => {
        const allImg = imgArea.querySelectorAll("img");
        allImg.forEach((item) => item.remove());
        const imgUrl = reader.result;
        const img = document.createElement("img");
        img.src = imgUrl;
        imgArea.appendChild(img);
        imgArea.classList.add("active");
        imgArea.dataset.img = image.name;

        // Set profileImage in the formData state
        setFormData((prevFormData) => ({
          ...prevFormData,
          profileImage: reader.result, // Set profileImage to the data URL of the selected image
        }));
      };
      reader.readAsDataURL(image);
    } else if (image && image.size >= 15000000) {
      alert("Image size more than 2MB");
    }
  };

  const handlepreview = () => {
    // Create a copy of the formData object and exclude the 'linkid' property
    const formDataCopy = { ...formData };
    delete formDataCopy.linkid;
  
    // Stringify the modified formData and send it to the preview page
    const formDataString = JSON.stringify(formDataCopy);
    const encodedFormData = encodeURIComponent(formDataString);
  
    // Open the preview page with the encoded formdata parameter
    window.open(`/preview/?formdata=${encodedFormData}`);
  };

  const [charIndex, setCharIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [dynamicText, setDynamicText] = useState("");
  const words = ["your LINKHUB"];
  useEffect(() => {
    const typeEffect = () => {
      const currentWord = words[wordIndex];
      const currentChar = currentWord.substring(0, charIndex + 1);

      setDynamicText(currentChar);

      if (charIndex === currentWord.length - 1) {
        // Word typing completed
        return;
      }

      // Move to the next character
      setCharIndex((prev) => prev + 1);
    };

    // Start typing effect
    const typingInterval = setInterval(typeEffect, 200);

    // Stop typing if all characters of the current word have been typed
    if (charIndex === words[wordIndex].length) {
      clearInterval(typingInterval);
      setTimeout(() => {
        // Move to the next word after a delay
        setWordIndex((prev) => (prev + 1) % words.length);
        setCharIndex(0); // Reset character index
      }, 1000); // Delay before moving to the next word
    }

    // Cleanup function
    return () => clearInterval(typingInterval);
  }, [charIndex, wordIndex, words]);

  return (
    <div className="Create_page">
      <div className="Side_container">
        <h1>
          <span>Create</span> <br></br>{" "}
          <span className="stop-blinking">{dynamicText}</span>.
        </h1>
        <div className="button_container">
          {/* <button onClick={handlepreview}>Preview</button> */}
        </div>
      </div>
      <div className="Create_container">
        <form onSubmit={handleSubmit} className="form">
          <button type="submit" className="create_submit">
            Submit
          </button>
          {Loading && <center><Loader /></center>}
          <div>
            <div className="img-area">
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                accept="image/*"
                hidden
              />
              <img
                src={profileIcon}
                width="100px"
                height="100px"
                alt="Profile"
              />
              <button
                className="select-image"
                type="button"
                onClick={handleSelectImage}
              >
                <FaPencil className="edit-icon" />
              </button>
            </div>
            <div className="name_container">
              <div className="input-box">
                <label>Linkhub Alias</label>

                <input
                  type="text"
                  placeholder="What should we call this LinkHub?"
                  value={formData.name}
                  name="name"
                  onChange={handleVariation}
                  autoComplete="off"
                  required
                />
                {alreadyExists && (
                  <p style={{ color: "#f409d2" }}>
                    * Alias of this name already exists... *
                  </p>
                )}
              </div>
              <div className="row">
                <div className="input-box">
                  <label>
                    <FaEnvelope /> Email
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Email"
                    value={formData.email}
                    name="email"
                    onChange={handleVariation}
                  />
                </div>
                <div className="input-box">
                  <label>
                    <FaPhone /> Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    value={formData.phoneNumber}
                    name="phoneNumber"
                    onChange={handleVariation}
                  />
                </div>
              </div>
              <div className="bio-input-box">
                <label>Bio</label>
                {/* <textarea placeholder="Enter your bio"></textarea> */}

                <ReactQuill
                  theme="snow"
                  value={quillvalue}
                  onChange={setQuillValue} // Corrected placement of onChange
                  modules={modules}
                  formats={formats}
                />
              </div>
              <div className="socials_links">
                <h2>Social Handles</h2>
                <div className="row-handles">
                  <div className="handles">
                    <img src={github} height="50px" width="50px" alt="GitHub" />
                    <div className="input-box-handles">
                      <input
                        type="text"
                        value={formData.github}
                        name="github"
                        onChange={handleVariation}
                        placeholder="GitHub ID"
                      />
                    </div>
                  </div>
                  <div className="handles">
                    <img
                      src={xlogo}
                      height="50px"
                      width="50px"
                      alt="X Handle"
                    />
                    <div className="input-box-handles">
                      <input
                        type="text"
                        placeholder="X Handle ID"
                        value={formData.x}
                        name="x"
                        onChange={handleVariation}
                      />
                    </div>
                  </div>
                </div>
                <div className="row-handles">
                  <div className="handles">
                    <img src={yt} height="50px" width="50px" alt="YouTube" />
                    <div className="input-box-handles">
                      <input
                        type="text"
                        placeholder="YouTube ID"
                        value={formData.yt}
                        name="yt"
                        onChange={handleVariation}
                      />
                    </div>
                  </div>
                  <div className="handles">
                    <img
                      src={instagramIcon}
                      height="47px"
                      width="47px"
                      alt="Instagram"
                    />
                    <div className="input-box-handles">
                      <input
                        type="text"
                        placeholder="Instagram ID"
                        value={formData.insta}
                        name="insta"
                        onChange={handleVariation}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="morelinks">
            {/* //show if atleast one link is added */}
            {urls.length > 0 && <h2>Links</h2>}

            {urls.map((url, index) => (
              <div className="input-box2" key={index}>
                <img
                  src={favicons[index] || question}
                  alt={github}
                  style={{ width: "40px", height: "40px" }}
                  className="addsocialsicon"
                  id="icon"
                />
                <input
                  type="url"
                  placeholder="Enter a URL"
                  value={url}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={names[index] || ""}
                  onChange={(e) => {
                    const newNames = [...names];
                    newNames[index] = e.target.value;
                    setNames(newNames);
                  }}
                />

                <button
                  onClick={() => handleDelete(index)}
                  className="deletebutton"
                >
                  <img src={cross} width={35} height={35}></img>
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAdd} className="addbutton">
              <img src={add} width="30px" height={"30px"}></img>
            </button>
          </div>
        </form>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
