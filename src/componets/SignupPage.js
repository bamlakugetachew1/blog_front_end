import axios from "axios";
import { useState } from "react";
import CustomPopup from "../utils/CustomPopup";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage] = useState("");

  const [visibility, setVisibility] = useState(false);
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  function Register(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/users/register", {
        username: username,
        password: password,
      })
      .then(function (response) {
        setMessage(response.data.message)
      })
      .catch(function (error) {
        console.log(error)
      });
    setVisibility(!visibility)
    }
  return (
    <form
      className="flex gap-2 flex-col max-w-lg mt-5 ml-auto mr-auto"
      onSubmit={Register}
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
        Register
      </button>
      <CustomPopup onClose={popupCloseHandler} show={visibility}>
        <h2>{message}</h2>
        <h2>{message}</h2>
      </CustomPopup>
    </form>
  );
}
export default Signup;
