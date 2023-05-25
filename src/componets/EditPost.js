import React, { useState,useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

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
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "color",
  "background",
];

function EditPost() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [summery, setSummery] = useState("");
  const navigate = useNavigate();
  const { edit } = queryString.parse(window.location.search);
  useEffect(() => {
    getsinglepost();
  }, []);

  async function getsinglepost() {
    try {
      const response = await axios.get(
        `https://blogapp-0bfm.onrender.com/api/posts/singlepost/${edit}`
      );
      setValue(response.data.data.content);
      setTitle(response.data.data.title);
      setSummery(response.data.data.summery);
    } catch (err) {
      console.log(err);
    }
  }

  function uploadImages(e) {
    e.preventDefault();
    axios
      .patch(`https://blogapp-0bfm.onrender.com/api/posts/${edit}`,
        {
          title: title,
          summery: summery,
          content: value,
        },
        {headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },}
      )
      .then(function (response) {
        navigate("/dashboard");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
     }

  return (
    <form
      onSubmit={uploadImages}
      className="flex gap-2 flex-col"
      encType="multipart/form-data"
     >
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="p-3 border border-solid border-gray-400 font-body"
        type="text"
        placeholder="title"
        required
      />
      <input
        value={summery}
        onChange={(e) => {
          setSummery(e.target.value);
        }}
        className="p-3 border border-solid border-gray-400 font-body"
        type="text"
        placeholder="summery"
        required
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
        className="w-full font-body bg-gray-400 text-white rounded-md mb-2"
      >
        Edit Post
      </button>
    </form>
  );
}
export default EditPost;
