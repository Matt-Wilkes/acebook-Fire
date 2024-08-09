// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import Box from "@mui/joy/Box";
// import Button from "@mui/joy/Button";
// import FormControl from "@mui/joy/FormControl";
// import FormLabel from "@mui/joy/FormLabel";
// import Textarea from "@mui/joy/Textarea";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Input } from "@mui/material";
import { updatePostComments } from "../../services/posts";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, CardActions } from "@mui/material";

export const CreateComment = (props) => {
  const [comment, setComment] = useState({
    message: "",
    userId: "",
  });

  const handleCommentChange = (event) => {
    const token = localStorage.getItem("token");
    setComment({
      ...comment,
      message: event.target.value,
      userId: jwtDecode(token).user_id,
    });
  };

  const handleSubmit = async (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    if (token) {
      try {
        //   await updatePostComments(token, comment);
        await updatePostComments(token, {
          id: props.post_id,
          comment: comment,
        });
        props.fetchPosts();
        setComment({ message: "", userId: "" });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        margin: "0 auto",
        padding: "0.1em",
        mt: 1,
      }}
    >
      <CardContent component="form" id="comment-form" onSubmit={handleSubmit}>
        <TextField
          inputProps={{
            "data-testid": "tcreate-post",
          }}
          label="Make a comment..."
          fullWidth
          size="small"
          variant="outlined"
          id="create-post"
          type="text"
          name="message"
          value={comment.message}
          onChange={handleCommentChange}
          multiline
          rows={2}
        />
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "right", mr: 1.3 }}>
        <Button
          data-testid="_submit-button"
          type="submit"
          form="comment-form"
          variant="contained"
        >
          Post
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreateComment;
