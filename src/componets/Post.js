import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useContext } from "react";
import BlogContext from "../store/blogstore";
import { useNavigate } from "react-router-dom";
import date from 'date-and-time';

function Post({
  _id,
  title,
  summery,
  author,
  imageurl,
  createdAt,
  isDashbord,
}) {
  const { changeRetrive } = useContext(BlogContext);
  const navigate = useNavigate();
  function editpost() {
    navigate(`/edit?edit=${_id}`);
  }

  async function removepost() {
    try {
      const id = _id + " " + localStorage.getItem("userid");
      const response = await axios.delete(
        `https://blogapp-0bfm.onrender.com/api/posts/${id}`,{withCredentials: true},
      );
      if (response.data.data === "deleted") {
        changeRetrive();
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section className="md:grid md:grid-cols-2 md:gap-3 mb-4">
      <div className="mb-1 md:mb-0">
        <img
          src={`https://res.cloudinary.com/dwq2ftoo3/image/upload/v1684947248/${imageurl}`}
          alt="images"
          className="w-full h-full"
        />
      </div>
      <div>
        <Link to={`/post/${_id}`}>
          {" "}
          <h3 className="font-bold">{title}</h3>
        </Link>
        <ul className="flex gap-2 mt-1 mb-1 font-body">
          <li className="capitalize text-slate-500">{author}</li>
          <li>
            {date.format(new Date(createdAt), 'MMM DD YYYY')}
          </li>
        </ul>
        <p className="font-body">{summery}</p>
        {localStorage.getItem("username") === author && isDashbord && (
          <div className="flex  gap-3 mt-5 hover:cursor-pointer">
            <FaEdit onClick={editpost} />
            <FaTrash onClick={removepost} />
          </div>
        )}
      </div>
    </section>
  );
}
export default Post;
