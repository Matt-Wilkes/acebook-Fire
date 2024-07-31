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
            <Link to="/">| Home | </Link>
            <Link to="/login"> Login | </Link>
            <Link to="/signup">Signup |</Link>
          </>
        )}
        {authStatus && (
          <>
            <Link to="/posts">| Posts | </Link>
            <LogoutButton />
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
