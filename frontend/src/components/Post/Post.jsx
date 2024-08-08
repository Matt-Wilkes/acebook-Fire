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
import AddCommentIcon from "@mui/icons-material/AddComment";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CreateComment from "../CreateComment/CreateComment";


const Post = (props) => {
  const [likes, setLikes] = useState(props.likes);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotateY(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  }));

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    const userId = jwtDecode(token).user_id;
    if (likes.includes(userId)) {
      setLikes(likes.filter((user) => user !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    updatePost(token, { id: props.post._id, likes: likes });
  }, [likes]);

  const formatDate = (date) => {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    return new Date(date).toLocaleString("en-GB", options).replace(",", "");
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
      elevation={2}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "#fbac3f", display: "flex" }}
            alt="Matt"
            src="/broken-image.jpg"
          ></Avatar>
        }
        title={`${props.firstName} ${props.lastName}`}
        style={{ textAlign: "left" }}
        subheader={`${formatDate(props.date)}`}
      />
      <CardContent sx={{ display: "flex" }}>
        <Typography variant="body2" color="text.secondary">
          {props.post.message}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "right", mr: 1.3 }}>
        <Button onClick={handleLike}>
          <ThumbUpIcon /> {likes !== 0 && likes.length}
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Button>
          <AddCommentIcon/>
        </Button>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CreateComment post_id={props.post._id}/>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
