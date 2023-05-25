import { useState, createContext } from "react";
const BlogContext = createContext();
export const BlogProvider = ({ children }) => {
  const initalstate = localStorage.getItem("isloogedin") || false;
  const [isloogedin, setIsloogedin] = useState(initalstate);
  const [commentnumber, changeNumberofcomment] = useState(0);
  const [retriveauthor, SetRetriveAuthor] = useState(false);
  const changeLog = () => {
    return setIsloogedin(!isloogedin);
  };
  const changeCommentSize = (size) => {
    return changeNumberofcomment(size);
  };
  const changeRetrive = () => {
    return SetRetriveAuthor(!retriveauthor);
  };
  return (
    <BlogContext.Provider
      value={{
        isloogedin,
        commentnumber,
        retriveauthor,
        changeRetrive,
        changeCommentSize,
        changeLog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;
