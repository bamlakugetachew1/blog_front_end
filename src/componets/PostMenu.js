import { useState, useEffect, useContext } from "react";
import CustomPopup from "../utils/CustomPopup";
import handleClick from "../utils/handleClick";
import BlogContext from "../store/blogstore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaPlay,
  FaPause,
  FaHeart,
  FaSave,
  FaComment,
  FaShare,
} from "react-icons/fa";
import { RWebShare } from "react-web-share";
function PostMenu(props) {
  const [play, setPlay] = useState(false);
  const [paused, setPaused] = useState(false);
  const [likes, setLikes] = useState(0);
  const [bgcolor, setBgclor] = useState(false);
  const [saved, setSaved] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const { commentnumber } = useContext(BlogContext);
  const navigate = useNavigate();
  const prevLocation = window.location.href;
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  var synthesis = window.speechSynthesis;
  useEffect(() => {
    getlikescount(props.id);
    if (localStorage.getItem("userid")) {
      savedcontent(localStorage.getItem("userid"));
    }
    return () => {
      synthesis.cancel();
    };
  }, []);

  function checkaleradyliked(data, id) {
    if (data.includes(id)) {
      setBgclor(true);
    }
  }

  async function getlikescount(id) {
    try {
      const response = await axios.get(
        `https://blogapp-0bfm.onrender.com/api/posts/likecount/${id}`
      );
      setLikes(response.data.length);
      checkaleradyliked(response.data.clamper, localStorage.getItem("userid"));
    } catch (err) {
      console.log(err);
    }
  }

  async function savedcontent(id) {
    try {
      const response = await axios.get(
        `https://blogapp-0bfm.onrender.com/api/users/saved/${id}`
      );
      if (response.data.user.includes(props.id)) {
        setSaved(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const speechHandlerPause = () => {
    setPlay(false);
    setPaused(true);
    synthesis.pause();
  };

  const speechHandler = (words) => {
    setPlay(true);
    if (paused) {
      synthesis.resume();
    } else {
      var utterance1 = new SpeechSynthesisUtterance();
      utterance1.text = words;
      synthesis.speak(utterance1);
      utterance1.onend = (event) => {
        synthesis.cancel();
        setPlay(false);
      };
    }
  };

  const LoveBlogs = (id) => {
    if (localStorage.getItem("userid")) {
      axios
        .post(
          "https://blogapp-0bfm.onrender.com/api/posts/like",
          {
            postid: id,
            commenterid: localStorage.getItem("userid"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          setBgclor(!bgcolor);
          getlikescount(id);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setVisibility(true);
    }
  };

  const SaveBlogs = (id) => {
    if (localStorage.getItem("userid")) {
      axios
        .post(
          "https://blogapp-0bfm.onrender.com/api/posts/save",
          {
            postid: id,
            commenterid: localStorage.getItem("userid"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          setSaved(!saved);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setVisibility(true);
    }
  };
  function logfrompopup() {
    navigate(`/login?redirectTo=${prevLocation}`);
  }
  return (
    <div>
      <div className="text-gray-400 text-xl mt-5 border border-l-0 border-r-0 border-solid px-2 py-3 flex justify-between">
        <div className="flex gap-7">
          <div className="flex gap-1">
            <FaHeart
              className={`${bgcolor ? "text-red-500" : ""}`}
              onClick={() => LoveBlogs(props.id)}
            />
            <span className="text-sm">{likes}</span>
          </div>
          <div className="flex gap-1">
            <FaComment onClick={() => handleClick("comment")} />
            <span className="text-sm">{commentnumber}</span>
          </div>
        </div>
        <div className="flex gap-7">
          <RWebShare
            data={{
              text: props.title,
              url: props.url,
              title: "choose site to share",
            }}
            disableNative={false}
            sites={[
              "facebook",
              "telegram",
              "copy",
              "twitter",
              "whatsapp",
              "reddit",
              "linkedin",
              "mail",
              "vk",
              "okru",
            ]}
            onClick={() => console.log("shared successfully!")}
          >
            <FaShare />
          </RWebShare>
          <FaSave
            className={`${saved ? "text-black" : ""}`}
            onClick={() => SaveBlogs(props.id)}
          />
          <div>
            {!play && <FaPlay onClick={() => speechHandler(props.content)} />}
            {play && <FaPause onClick={() => speechHandlerPause()} />}
          </div>
        </div>
        <CustomPopup onClose={popupCloseHandler} show={visibility}>
          <h3>Log in to complete action</h3>
          <button
            className="p-2 bg-slate-300 mt-1 rounded-md"
            onClick={logfrompopup}
          >
            Log in{" "}
          </button>
        </CustomPopup>
      </div>
    </div>
  );
}
export default PostMenu;
