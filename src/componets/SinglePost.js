import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PostMenu from "./PostMenu";
import Comment from "./Comment";
import date from "date-and-time";
import SinglepageSkeleton from "./SinglepageSkelton";

function SinglePost() {
  const { id } = useParams();
  const [singlepost, setSinglepost] = useState({});
  const [loading, Setloading] = useState(true);
  const [readtime, setReadtime] = useState(0);
  useEffect(() => {
      getsinglepost();
  }, []);

  function estimatetime(data) {
    const strippedHtml = data.replace(/<[^>]+>/g, "");
    const estimatedtime = Math.ceil(strippedHtml.split(" ").length / 225);
    setReadtime(estimatedtime);
  }

  async function getsinglepost() {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/posts/singlepost/${id}`
      );
      setSinglepost(response.data.data);
      estimatetime(response.data.data.content);
      Setloading(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      { !loading &&
        <div>
          <div className="mb-5 text-left">
            <h3 className="font-bold font-body text-lg">{singlepost.title}</h3>
            <div className="flex justify-start gap-1 font-body text-gray-500 ">
              <p className="capitalize text-slate-500">{singlepost.author}</p>
              <p className="mr-1">{`${readtime} min read`}</p>
              <p>
                {date.format(new Date(singlepost.createdAt), "MMM DD YYYY")}
              </p>
            </div>
            <PostMenu content={singlepost.content} id={id} />
          </div>
          <div>
            <img
              src={`https://res.cloudinary.com/dwq2ftoo3/image/upload/v1684947248/${singlepost.imageurl}`}
              alt="images"
              className="w-full h-56"
            />
          </div>
          <div className="mt-1">
            <ReactQuill
              value={singlepost.content}
              readOnly={true}
              theme={"bubble"}
            />
          </div>
          <Comment postid={id} />
        </div>
      }
      {
        loading && <SinglepageSkeleton/>
      }
    </div>
  );
}
export default SinglePost;
