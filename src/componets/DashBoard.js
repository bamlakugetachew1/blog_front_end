import Post from "./Post";
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import BlogContext from "../store/blogstore";

function DashBoard() {
  const [posts, setPosts] = useState([]);
  const [check, setCheck] = useState(false);
  const { retriveauthor } = useContext(BlogContext);
  const [message,setMessage] = useState("You Have no published blogs");
  useEffect(() => {
    getpostbyauthor();
  }, [retriveauthor]);
    async function getpostbyauthor() {
    try {
      const response = await axios.get(
        `https://blogapp-0bfm.onrender.com/api/posts/${localStorage.getItem("username")}`,
        {
          headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        }
      );
      setPosts(response.data.data);
      if (response.data.length === 0) {
        setCheck(true);
        setMessage("You Have no published blogs");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getsavedpostbyauthor() {
    try {
      const response = await axios.get(
        `https://blogapp-0bfm.onrender.com/api/posts/saved/${localStorage.getItem("username")}`,
        {
          headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        }
      );
      setPosts(response.data.data);
      if (response.data.length === 0) {
        setCheck(true);
        setMessage("You Have not saved any blogs yet");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getlikedpostbyauthor() {
    try {
      const response = await axios.get(
        `https://blogapp-0bfm.onrender.com/api/posts/liked/${localStorage.getItem("username")}`,
        {
          headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        }
      );
      setPosts(response.data.data);
      if (response.data.length === 0) {
        setCheck(true);
        setMessage("You Have not liked any blogs yet");
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div>
      <div className="flex justify-between font-body capitalize text-red-500 mb-3">
        <h3 onClick={getpostbyauthor} className="hover:cursor-pointer">{localStorage.getItem("username")}</h3>
        <div className="hover:cursor-pointer flex gap-2">
          <h3 onClick={getsavedpostbyauthor}>Saved</h3>
          <h3 onClick={getlikedpostbyauthor}>Liked</h3>
        </div>
      </div>
      <div>
        {posts.length > 0 &&
          posts.map((data) => {
            return <Post key={data._id} {...data} isDashbord={true} />;
          })}
        {!check && posts.length < 1 && (
          <div className="text-center mt-32 font-body">
            <h3>Grabbing Your Blogs</h3>
            <h3 className="text-4xl from-slate-400 to-gray-400 animate-pulse">
              ...
            </h3>
          </div>
        )}
        {(check && posts.length < 1) && (
          <div className="text-center mt-32 font-body ">
            <h3 className="capitalize text-red-500">
              {message}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
export default DashBoard;
