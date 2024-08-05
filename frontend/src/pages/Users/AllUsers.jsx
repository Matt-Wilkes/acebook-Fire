import { useState, useEffect } from "react";

import UserCard from "../../components/UserCard/UserCard"


const AllUsers = () => {

  const [usersState, setUsersState] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json()
    // console.log(data.users)
    setUsersState(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <>
      <h1>All Users</h1>
    {usersState.map((user)=>{

      const {image, firstName, lastName, email} = user
      return(
        <>
        <div style={{ margin: "1em",  overflow: 'hidden', display: "inline-block", flexDirection: "row"}}>

        <UserCard
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