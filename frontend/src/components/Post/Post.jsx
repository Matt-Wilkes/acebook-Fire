import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button } from "@mui/material";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const Post = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes);

  const userId = jwtDecode(props.token).user_id;

  const handleLike = () => {
    const match = likes.filter((user) => user !== userId);
      if (likes.length > 0 && match) {
        console.log(match);
        setLikes(likes.filter((user) => user !== userId));
        // const new_likes = (likes.filter((user) => user !== userId));
        console.log(likes)
      }else if (likes.length >= 0){
        setLikes([...likes, userId]);
        console.log(likes);
      }
    console.log(userId);
    // setLikes(likes + (isLiked ? -1 : 1));
    // setIsLiked(!isLiked);
  };

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
