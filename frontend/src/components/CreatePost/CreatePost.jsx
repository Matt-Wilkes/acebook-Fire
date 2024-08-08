import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/posts";
import { jwtDecode } from "jwt-decode";
import { Input } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, CardActions } from "@mui/material";

import "./CreatePost.css";

export const CreatePost = (props) => {


  const [post, setPost] = useState({
    message: "",
    userId: "",
    likes: [],
  });

  const handlePostChange = (event) => {
    const token = localStorage.getItem("token");
    setPost({
      ...post,
      message: event.target.value,
      userId: jwtDecode(token).user_id
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    if (token) {
      try {
        // I have taken setPost to handlePostChange - add validation for an empty post.
        await createPost(token, post);
        navigate("/posts");
        props.fetchPosts();
        setPost({ message: "", userId: "", likes: [] });
      } catch (err) {
        console.error(err);
        navigate("/posts");
      }
    }
  };
  return (
    //   <><Box
    //   className="create-post"
    //   onSubmit={handleSubmit}
    //   component="form"
    //   sx={{
    //     width: "100vh",
    //     height: "600vh",
    //     maxWidth: "100%",
    //   }}
    // >
    //   <TextField
    //     fullWidth
    //     id="create-post"
    //     placeholder="Create a new post..."
    //     data-testid="tcreate-post"
    //     type="text"
    //     value={post.message}
    //     onChange={handlePostChange}
    //     // label="fullWidth"
    //     multiline
    //     rows={4} />
    //   <Input type="submit" variant="outlined" value="Post" />
    // </Box><label htmlFor="create-post"></label></>
    <Card 
      sx={{
        width: "90vh",
        margin: "0 auto",
        padding: "0.1em",
        mt: 3,
      }}
    >

      <CardContent
        component="form"
        id="post-form"
        onSubmit={handleSubmit}
      >

        <TextField
          inputProps={{
            "data-testid": "tcreate-post",
          }}
          label="Create a new post..."
          fullWidth
          size="small"
          variant="outlined"
          id="create-post"
          type="text"
          name="message"
          value={post.message}
          onChange={handlePostChange}
          multiline
          rows={4}
          // sx={{ mb: 3 }}
        />
      </CardContent>
      <CardActions sx={{ display:"flex" , justifyContent:"right", mr: 1.3}}>
        <Button
          data-testid="_submit-button"
          type="submit"
          form="post-form"
          variant="contained"
        >
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreatePost;
