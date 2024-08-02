import { getUser } from "../../services/users";
import { jwtDecode } from "jwt-decode";

export const MyProfile = () => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    getUser(jwtDecode(token).user_id).then((data) => {
      console.log(data.user[0]);
    });
  }

  return (
    <>
      {token === null && <div>You are not logged in. Please login.</div>}
      {token !== null && (
        <>
          <h1>My Profile</h1>
          <div>Some Stuff Here</div>
        </>
      )}
    </>
  );
};
