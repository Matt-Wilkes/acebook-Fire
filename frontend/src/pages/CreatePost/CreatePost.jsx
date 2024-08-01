import { useState } from "react";
import { useNavigate} from "react-router-dom";
// import PostsController from "../../../../api/controllers/posts"
import { createPost } from "../../services/posts";
import "./CreatePost.css";


export const CreatePost = () => {
  const [post, setPost] = useState("");
  const handlePostChange = (event) => {
    console.log(event);
    setPost(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (token){try {
      await createPost(token, post);
    } catch (err) {
      console.error(err);
      navigate("/posts");
    }
    console.log(post);
    console.log(token);
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
