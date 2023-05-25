import { Link } from "react-router-dom";
import { useContext } from "react";
import BlogContext from "../store/blogstore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const { isloogedin, changeLog } = useContext(BlogContext);
  const navigate = useNavigate();
  function  removeCookie(){
    axios
    .get("https://blogapp-0bfm.onrender.com/api/users/logout",{withCredentials: true})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  function logout() {
    localStorage.removeItem("isloogedin");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    changeLog();
    removeCookie();
    navigate('/');
  }
  return (
    <nav className="flex justify-between font-body mb-7 cursor-pointer">
      <h1 className="font-bold">
        <Link to="/">MyBlog</Link>
      </h1>
      {!isloogedin && (
        <ul className="flex gap-2 ">
          <li>
            <Link to="/signup">Sign up</Link>{" "}
          </li>
          <li>
            <Link to="/login">Log In</Link>{" "}
          </li>
        </ul>
      )}
      {isloogedin && (
        <ul className="flex gap-2 ">
          <li>
            <Link to="/dashboard">Dash Board</Link>{" "}
          </li>
          <li>
            <Link to="/createpost">Create Post</Link>{" "}
          </li>
          <li>
            <button onClick={logout}>Log out</button>
          </li>
        </ul>
      )}
    </nav>
  );
}
export default NavBar;
