import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/CreatePost/CreatePost";
import { useContext } from "react";
import Context from "../../components/Context/Context";
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import UserCard from "../../components/UserCard/UserCard";


export const FeedPage = () => {
  // const { authStatus, setAuthStatus } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();


  const fetchPosts = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getPosts(token)
        .then((data) => {
          const sortedPosts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
          setPosts(sortedPosts);
          localStorage.setItem("token", data.token); 
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchPosts();
  },[]); 


  return (
    <>
      <CreatePost fetchPosts={fetchPosts} />
      <h2>Posts</h2>
      <Container justifyContent="center" className="feed" role="feed" sx={{width: '100vh' }}>
      <Box justifyContent="center" className="feed" role="feed" >
      {posts.map((post) => (
          <Post post={post} key={post._id} comments={post.comments} likes={post.likes} date={post.date} userId={post.userId} firstName={post.firstName} lastName={post.lastName} fetchPosts={fetchPosts}/>
        ))}
      </Box>
      </Container>
      
    </>
  );
}
