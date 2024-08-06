import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/users";

import UserCard from "../../components/UserCard/UserCard"


const AllUsers = () => {

  const navigate = useNavigate()
  const [usersState, setUsersState] = useState([]);

  // const fetchUsers = async () => {
  //   const response = await fetch("http://localhost:3000/users");
  //   const data = await response.json()
  //   // console.log(data.users)
  //   setUsersState(data.users);
  // };

  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getUsers(token)
        .then((data) => {
          setUsersState(data.users);
          // localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, [navigate]);




  return (
    <>
      <h1>All Users</h1>
    {usersState.map((user)=>{

      const {id, image, firstName, lastName, email} = user
      return(
        <>
        <div style={{ margin: "1em",  overflow: 'hidden', display: "inline-block", flexDirection: "row"}}>

        <UserCard
        data-testid="user-card"
        key={id}
        image={image}
        firstName={firstName}
        lastName={lastName}
        email={email}
        button1Text={"Add Friend"}
        // button2Text={"❤️"}
        />
        </div>
        </>
      )
    })}
    </>
  )
}

export default AllUsers