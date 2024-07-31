import { Link } from "react-router-dom";

import "./CreatePost.css";


export const CreatePost = () => {
    const [post, setPost] = useState("");
    const handlePostChange = (event) => {
        console.log(event)
        setPost(event.target.value);
    };

  return (
    <div className="create-post">
      <h1>Create New Post Here</h1>
      <form onSubmit={handleSubmit}></form>
      <label htmlFor="create post ">Create Post</label>
      <input
          id="create-post"
          type="text"
          value={message}
          onChange={handlePostChange}
        />
      <Link to="/logout">Log Out</Link>
    </div>
  );
//   return (
//     <>
//         <label htmlFor="password">Password:</label>
//         <input
//           id="password"
//           type="password"
//           value={password}
//           onChange={handlePasswordChange}
//         />
//         <input role="submit-button" id="submit" type="submit" value="Submit" />
//       </form>
//     </>
//   );
};
