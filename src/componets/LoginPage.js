import { useState, useContext } from "react";
import axios from "axios";
import CustomPopup from "../utils/CustomPopup";
import BlogContext from "../store/blogstore";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [visibility, setVisibility] = useState(false);
  const { changeLog } = useContext(BlogContext);
  const navigate = useNavigate();
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  function login(e) {
    e.preventDefault();
    axios
      .post(
        "https://blogapp-0bfm.onrender.com/api/users/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        if (response.data.message === "success") {
          localStorage.setItem("isloogedin", true);
          localStorage.setItem("userid", response.data.userid);
          localStorage.setItem("username", response.data.username);
          changeLog();
          const { redirectTo } = queryString.parse(window.location.search);
          if (redirectTo === null || redirectTo === undefined) {
            navigate("/");
          } else {
            window.location.href = redirectTo;
            navigate(window.location.href);
          }
        }
        setMessage(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
    setVisibility(!visibility);
  }

  return (
    <form
      className="flex gap-2 flex-col max-w-lg mt-5 ml-auto mr-auto"
      onSubmit={login}
    >
      <input
        onChange={(e) => setUsername(e.target.value)}
        className="p-3 border border-solid border-gray-400 font-body rounded-md"
        type="text"
        placeholder="name"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border border-solid border-gray-400 font-body rounded-md"
        type="password"
        placeholder="password"
        required
      />
      <button
        type="submit"
        className="w-full font-body bg-gray-400 text-white rounded-md"
      >
        Log In
      </button>
      <CustomPopup onClose={popupCloseHandler} show={visibility}>
        <h2>{message}</h2>
        <h2>{message}</h2>
      </CustomPopup>
    </form>
  );
}
export default LoginPage;
