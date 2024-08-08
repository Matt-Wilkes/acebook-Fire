import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { updatePost } from "../../services/posts";

const Post = (props) => {
  // const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes);

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    const userId = jwtDecode(token).user_id;
    if (likes.includes(userId)) {
      setLikes(likes.filter((user) => user !== userId));
      console.log(`'unlike'${likes}`);
    } else {
      setLikes([...likes, userId]);
      console.log(`'like'${likes}`);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    updatePost(token, { id: props.post._id, likes: likes });
    }, [likes]);
  

  return (
    <article key={props.post._id}>
      {props.post.message}
      <Button onClick={handleLike}>
        <ThumbUpIcon />
        {likes !== 0 && <div>{likes.length}</div>}
      </Button>
    </article>
  );
};

export default Post;
