import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import { getUser } from "../../services/users";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/CreatePost/CreatePost";


export const FeedPage = () => {
  // const [user, setUser] = useState({})
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

  
  // const fetchGetUser = async (token) => {
  //   const data = await getUser(jwtDecode(token).user_id);
  //   console.log(data)
  //   setUser({
  //     user_id: jwtDecode(token).user_id,
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //   });
  // };


  return (
    <>
      <CreatePost fetchPosts={fetchPosts} />
      <h2>Posts</h2>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} likes={post.likes} date={post.date} userId={post.userId}/>
        ))}
      </div>
    </>
  );
}
