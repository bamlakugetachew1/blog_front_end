import HomePage from "./componets/HomePage";
import Signup from "./componets/SignupPage";
import LoginPage from "./componets/LoginPage";
import NavBar from "./componets/NavBar";
import CreatePost from "./componets/CreatePost";
import SinglePost from "./componets/SinglePost";
import DashBoard from "./componets/DashBoard";
import EditPost from "./componets/EditPost";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <main className="max-w-2xl md:ml-auto md:mr-auto mt-7 mx-2 md:mx-0 relative">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/createpost" element={<CreatePost />}></Route>
        <Route path="/post/:id" element={<SinglePost />}></Route>
        <Route path="/dashboard" element={<DashBoard/>}></Route>
        <Route path="/edit" element={<EditPost/>}></Route>
      </Routes>
    </main>
  );
}

export default App;
