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
    const userId = jwtDecode(token).user_id;
    if (token){try {
      await createPost(token, post);
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
      <form onSubmit={handleSubmit}>
      <label htmlFor="create-post"></label>
      <input
        id="create-post"
        placeholder="Create a new post..."
        data-testid="tcreate-post"
        type="text"
        value={post}
        onChange={handlePostChange}
      />
      <input
        type="submit"

      />
      </form>
      
    
    </div>
  );


};

export default CreatePost;
