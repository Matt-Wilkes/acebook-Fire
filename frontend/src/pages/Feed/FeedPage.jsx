import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/CreatePost/CreatePost";
import { jwtDecode } from "jwt-decode";


export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // const userId = jwtDecode(token).user_id;

  const fetchPosts = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getPosts(token)
        .then((data) => {
          const sortedPosts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
          setPosts(sortedPosts);
          localStorage.setItem("token", data.token); //ask about this
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
  }, [navigate]);


  return (
    <>
      <CreatePost fetchPosts={fetchPosts} />
      <h2>Posts</h2>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} likes={post.likes} token={token} date={post.date}/>
        ))}
      </div>
    </>
  );
}
