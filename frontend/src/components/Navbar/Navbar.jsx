import { useContext } from "react";
import Context from "../Context/Context";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { authStatus, setAuthStatus } = useContext(Context);
  return (
    <>
      <nav style={{ background: "LightGray" }}>
        {!authStatus && (
          <>
            <Link to="/login">| Login | </Link>
            <Link to="/signup">Signup |</Link>
          </>
        )}
        {authStatus && (
          <>
            <LogoutButton />
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;

// <nav>
//   {/* <Link to="/posts">Feed</Link> */}
//   {/* <LogoutButton /> */}
//
// </nav>
// } else if (localStorage.getItem("token") === null) {
//   return (
//     <nav>
//       {/* <Link to="/login">Login</Link>
//       <Link to="/signup">Signup</Link> */}
//       <a href="/html/">LOGGED OUT</a>
//     </nav>
//   );
