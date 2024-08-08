import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { updatePost } from "../../services/posts";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";

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


  const formatDate = (string) => {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card
      key={props.post._id}
      sx={{
        width: "90vh",
        margin: "0 auto",
        padding: "0.1em",
        mt: 3,
      }}
      raised
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "#fbac3f", display: "flex" }}
            alt="Matt"
            src={props.image}
          ></Avatar>
        }
        title={`${props.firstName} ${props.lastName}`}
        subheader={formatDate(props.date)}
        style={{ textAlign: "left" }}
      />
      <CardContent sx={{ display: "flex" }}>
        <Typography variant="body2" color="text.secondary">
          {props.post.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={handleLike}>
          <ThumbUpIcon />
          {likes !== 0 && likes.length}
        </Button>
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography> */}
      {/* </CardContent> */}
      {/* </Collapse> */}
    </Card>
  );
};

export default Post;
