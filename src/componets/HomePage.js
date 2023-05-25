import Post from "./Post";
import { useState, useEffect } from "react";
import axios from "axios";
import HomeSkeleton from "./Homeskelton";
function HomePage() {
  const [posts, setPosts] = useState([]);
  let [page, setPage] = useState(1);
  const [postlength, setPostlength] = useState(0);
  const [display,setDisplay] = useState(false);
  useEffect(() => {
      getallpostLength();
      getallpost();
  }, []);

  async function getallpost() {
    try {
      const response = await axios.get(
        `https://blogapp-0bfm.onrender.com/api/posts/getall/${page}`
      );
      let temprray = [...posts];
      for (let i = 0; i < response.data.data.length; i++) {
        temprray.push(response.data.data[i]);
      }
      setDisplay(false);
      setPosts(temprray);
    } catch (err) {
      console.log(err);
    }
  }

  async function getallpostLength() {
    try {
      const response = await axios.get(
        "https://blogapp-0bfm.onrender.com/api/posts/lengths"
      );
      setPostlength(response.data.postlength);
    } catch (err) {
      console.log(err);
    }
  }

  function loadmore() {
     setDisplay(true);
      page += 1;
      setPage(page);
      getallpost();
  }

  return (
    <div>
      {posts.length > 0 &&
        posts.map((data) => {
          return <Post key={data._id} {...data} isDashbord={false} />;
        })}
      {(posts.length < 1 || display) && <HomeSkeleton />}
      {page * 3 < postlength && (
        <button
          onClick={loadmore}
          className="capitalize bg-slate-300 p-2 rounded-md font-body mb-2"
        >
          Load more
        </button>
      )}
    </div>
  );
}

export default HomePage;
