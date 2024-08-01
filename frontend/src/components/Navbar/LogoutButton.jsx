import { useContext } from "react";
import Context from "../Context/Context";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { authStatus, setAuthStatus } = useContext(Context);
  const Logout = () => {
    setAuthStatus(false);
    localStorage.removeItem("token");
    navigate("/", { state: "You were logged out" });
  };

  return <button data-testid="_logout" onClick={Logout}>Logout</button>;
};

export default LogoutButton;
