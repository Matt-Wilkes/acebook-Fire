import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button } from "@mui/material";
import { useState } from "react";   

const Post = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(props.post.likes.length);
  
  const handleLike = () => {
    setLikes(likes + (isLiked ? -1 : 1));
    setIsLiked(!isLiked);
  };

  return (
    <article key={props.post._id}>
      {props.post.message}
      <Button onClick={handleLike}>
        <ThumbUpIcon />
        {likes !== 0 && <div>{likes}</div>}
      </Button>
    </article>
  );
};


export default Post;
