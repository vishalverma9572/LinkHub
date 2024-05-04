import React, { useEffect, useState, useRef } from "react"; // Import useEffect from react
import profileIcon from "../images/user-profile-icon.png";
import edit from "../images/edit.png";
import pencil from "../images/pencil.png";
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
import Logo from "./Logo";
import question from "../images/question_mark.png";
import tick from "../images/tickmark.png";
import axios from "axios";
import Quill from "quill";
import uniqid from "uniqid";
import "./form.css"; // Make sure to import your CSS file
// import '../scripts/imgupload.js'; // Import any JavaScript files
// import '../scripts/script.js'; // Import any JavaScript files
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

function Form() {
  const [urls, setUrls] = useState([]);
  const [favicons, setFavicons] = useState([]);
  const uuid = uniqid();
  const [formData, setFormData] = useState({
    linkid: uuid,
    alias: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(req.body); // Add this line to check the received data
      // Send form data to server using Axios
      await axios.post("/api/formdata", formData);
      alert("Form data submitted successfully");
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Error submitting form data");
    }
  };

  const handleVariation = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
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
      name: newNames[i],
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
  const quillRef = useRef(null); // Create a ref for Quill editor

  useEffect(() => {
    const quill = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          [{ color: [] }],
        ],
      },
      formats: [
        "bold",
        "italic",
        "underline",
        "strike",
        "header",
        "list",
        "link",
        "image",
      ],
      placeholder: "Add your details here...", // Corrected placeholder text
    });
  }, []);

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

  console.log(val, "data-");

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
    <div className="mywrapper">
      <div className="side_container">
        <h1>
          <span>Create</span> <br></br>{" "}
          <span className="stop-blinking">{dynamicText}</span>.
        </h1>
      </div>

      <section className="form_page_container">
        <form onSubmit={handleSubmit} className="form">
          {/* <img src={tick}  className='submitimg'></img> */}
          <button type="submit" className="submit">
            <h1 className="donebtn">Submit</h1>
          </button>
          <div className="container2">
            <input
              type="file"
              id="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
            <div className="img-area" data-img="">
              <img
                src={profileIcon}
                width="100px"
                height="100px"
                alt="Profile"
              />
            </div>
            <button
              className="select-image"
              onClick={handleSelectImage}
              type="button"
            >
              <img
                src={edit}
                width="40px"
                height="40px"
                alt="Select"
                className="editpng"
              />
            </button>
          </div>
          <div className="input-box">
            <label>Linkhub Alias</label>
            <input
              type="text"
              placeholder="What should we call this LinkHub?"
              value={formData.alias}
              name="alias"
              onChange={handleVariation}
              required
            />
          </div>
          <div className="row">
            <div className="input-box">
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter Email"
                value={formData.email}
                name="email"
                onChange={handleVariation}
              />
            </div>
            <div className="input-box">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                name="phoneNumber"
                onChange={handleVariation}
              />
            </div>
          </div>
          <div className="input-box">
            <label>Bio</label>
            {/* <textarea placeholder="Enter your bio"></textarea> */}
            <div
              style={{ width: 650, height: 70, borderRadius: "6px" }}
              className="quillbox"
            >
              <div ref={quillRef} />
            </div>
          </div>
          <div className="socials">Socials</div>
          <div className="row-handles">
            <div className="handles">
              <img src={github} height="50px" width="50px" alt="Instagram" />
              <div className="input-box-handles">
                <input
                  type="text"
                  value={formData.github}
                  name="github"
                  onChange={handleVariation}
                  placeholder="id"
                />
              </div>
            </div>
            <div className="handles">
              <img src={xlogo} height="50px" width="50px" alt="Instagram" />
              <div className="input-box-handles">
                <input
                  type="text"
                  placeholder="id"
                  value={formData.x}
                  name="x"
                  onChange={handleVariation}
                />
              </div>
            </div>
          </div>
          <div className="row-handles">
            <div className="handles">
              <img src={yt} height="50px" width="50px" alt="Instagram" />
              <div className="input-box-handles">
                <input
                  type="text"
                  placeholder="id"
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
                  placeholder="id"
                  value={formData.insta}
                  name="insta"
                  onChange={handleVariation}
                />
              </div>
            </div>
          </div>

          <button type="button" onClick={handleAdd} className="addbutton">
            <img src={add} width="30px" height={"30px"}></img>
          </button>
          {urls.map((url, index) => (
            <div className="input-box2" key={index}>
              <img
                src={favicons[index] || question}
                // alt={github}
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
        </form>
      </section>
      <Text />
      <Logo />
    </div>
  );
}

export default Form;
