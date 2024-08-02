import { useContext } from "react";
import Context from "../Context/Context";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { authStatus, setAuthStatus } = useContext(Context);

  return (
    <>
      <nav data-testid="_nav" style={{ background: "LightGray" }}>
        {!authStatus && (
          <>
            <Link data-testid="_home" to="/">| Home | </Link>
            <Link data-testid="_login" to="/login"> Login | </Link>
            <Link data-testid="_signup" to="/signup">Signup |</Link>
          </>
        )}
        {authStatus && (
          <>
            <Link data-testid="_my-profile" to="/my-profile">| My Profile | </Link>
            <Link data-testid="_posts" to="/posts">| Posts | </Link>
            <LogoutButton />
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
