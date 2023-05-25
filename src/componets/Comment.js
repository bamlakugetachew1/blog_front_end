import axios from "axios";
import { useState, useEffect,useContext } from "react";
import BlogContext from "../store/blogstore";
import CustomPopup from "../utils/CustomPopup";
import { useNavigate } from "react-router-dom";

function Comment(props) {
  const [comments, setComment] = useState("");
  const [data, setdata] = useState([]);
  const {commentnumber,changeCommentSize} = useContext(BlogContext);
  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();
  const prevLocation = window.location.href;
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };
  useEffect(() => {
    getcomments();
  }, []);

  async function getcomments() {
    try {
      const response = await axios.get(
        `https://blogapp-0bfm.onrender.com/api/posts/comment/${props.postid}`
      );
      setdata(response.data.data);
      changeCommentSize(response.data.length);
    } catch (err) {
      console.log(err);
    }
  }

  function comment() {
    if (localStorage.getItem("userid")) {
    axios
      .post(
        "https://blogapp-0bfm.onrender.com/api/posts/comment/create",
        {
          comment: comments,
          commenterid: localStorage.getItem("userid"),
          postid: props.postid,
        },
        { withCredentials: true }
      )
      .then(function (response) {
        setComment("");
        getcomments();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
      setVisibility(true);
    }
  }
  function logfrompopup(){
    navigate(`/login?redirectTo=${prevLocation}`);
   }

  return (
    <div id="comment-section" className="shadow-md">
      <h1 className="font-bold font-body ml-2">Top Comments ({commentnumber}) </h1>
      <textarea
        value={comments}
        onChange={(e) => setComment(e.target.value)}
        className=" mb-3 p-3 mt-1 w-f border border-solid border-gray-200 focus:outline-none w-full focus:border-gray-400"
        placeholder="Add to disscution"
      ></textarea>
      {comments.length > 0 && (
        <button
          onClick={comment}
          className="ml-2 mt-1 mb-1 bg-blue-100 p-2 rounded-sm font-body"
        >
          Comment
        </button>
      )}

      {data.length > 0 &&data.map((data) => {
        return (
          <div key={data._id} className="mt-2 font-body border border-solid border-gray-200 shadow-sm p-3 mb-2">
            <div className="flex gap-3 mb-2">
              <h3>Bamlaku</h3>
              <p>{new Date(data.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h3>
              {data.comment}
              </h3>
            </div>
          </div>
        );
      })}
         <CustomPopup onClose={popupCloseHandler} show={visibility}>
          <h3>Log in to complete action</h3>
          <button className="p-2 bg-slate-300 mt-1 rounded-md" onClick={logfrompopup}>Log in </button>
        </CustomPopup>
    </div>
  );
}

export default Comment;
