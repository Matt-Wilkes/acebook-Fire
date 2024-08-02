import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { createPost } from "../../services/posts";
import { jwtDecode } from "jwt-decode";
import "./CreatePost.css";


export const CreatePost = (props) => {
  const [post, setPost] = useState("");
  const handlePostChange = (event) => {
    setPost(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (token){try {
      await createPost(token, `${post} was created by ${jwtDecode(token).user_id}`);
      navigate("/posts");
      props.fetchPosts();
    } catch (err) {
      console.error(err);
      // navigate("/posts");
    }
  }
  };

  return (
    <div className="create-post">
      <h1>Create New Post Here</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="create-post">Create Post</label>
      <input
        id="create-post"
        type="text"
        value={post}
        onChange={handlePostChange}
      />
      <input
        type="submit"

      />
      </form>
      
      {/* <Link to="/logout">Log Out</Link> */}
    </div>
  );
};

export default CreatePost;