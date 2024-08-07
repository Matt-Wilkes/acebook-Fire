import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button } from "@mui/material";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const Post = (props) => {
  // const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes);

  const handleLike = () => {
    const token = localStorage.getItem("token");
    const userId = jwtDecode(token).user_id;
    const match = likes.filter((user) => user !== userId);
      if (likes.includes(userId)){
        console.log(match);
        setLikes(likes.filter((user) => user !== userId));
        console.log(likes)
        console.log("unlikes")
      }else {
        setLikes([...likes, userId]);
        console.log("likes");
      }
    console.log(userId);
  };

  return (
    <article key={props.post._id}>
      message: {props.post.message} 
      user: {props.userId}
      likes: {likes}
      <Button onClick={handleLike}>
        <ThumbUpIcon />
        {likes !== 0 && <div>{likes.length}</div>}
      </Button>
    </article>
  );
};


export default Post;
