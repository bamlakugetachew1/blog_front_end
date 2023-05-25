import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import CustomPopup from "../utils/CustomPopup";
import { useNavigate } from "react-router-dom";
import '../App.css'

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  'font',
  'size',
  'bold', 'italic', 'underline',
  'list', 'bullet',
  'align',
  'color', 'background'
];




function CreatePost() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [summery, setSummery] = useState("");
  const [file, setFile] = useState("empty");
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const popupCloseHandler = (e) => {
    setVisibility(e);
  };
 function uploadImages(e) {
    e.preventDefault();
    if (file !== "empty") {
      document.getElementById("post").innerHTML="____________";
      const theButton = document.querySelector(".post");
           console.log(theButton)
      theButton.classList.add("button--loading");
      const formData = new FormData();
      formData.append("postimages", file);
      axios
        .post("https://blogapp-0bfm.onrender.com/api/posts/uploadimage", formData, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message === "success") {
            axios
            .post("https://blogapp-0bfm.onrender.com/api/posts/create", {
              title: title,
              summery: summery,
              content:value,
              imageurl:res.data.imageurl
            },{withCredentials: true})
            .then(function (response) {
             navigate('/');
             console.log(response)
            })
            .catch(function (error) {
              console.log(error)
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMessage("One Image Required");
      setVisibility(!visibility);
    }
  }


  return (
    <form
      onSubmit={uploadImages}
      className="flex gap-2 flex-col"
      encType="multipart/form-data"
    >
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="p-3 border border-solid border-gray-400 font-body"
        type="text"
        placeholder="title"
        required
      />
      <input
        onChange={(e) => {
          setSummery(e.target.value);
        }}
        className="p-3 border border-solid border-gray-400 font-body"
        type="text"
        placeholder="summery"
        required
      />
      <input
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
        className="p-3 border border-solid border-gray-400 font-body"
        type="file"
      />
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={setValue}
      />
      <button
        type="submit"
        className="mx-auto relative font-body bg-gray-400 text-white p-2 mb-2 post"
        id="post"
      >
        Create Post
      </button>
      <CustomPopup onClose={popupCloseHandler} show={visibility}>
        <h2>{message}</h2>
        <h2>{message}</h2>
      </CustomPopup>
    </form>
  );
}
export default CreatePost;
