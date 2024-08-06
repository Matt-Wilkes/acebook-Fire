import { useContext } from "react";
import Context from "../Context/Context";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { authStatus, setAuthStatus } = useContext(Context);
  const Logout = () => {
    setAuthStatus(false);
    localStorage.removeItem("token");
    navigate("/", { state: "You were logged out" });
  };

  return (
    <Button data-testid="_logout" onClick={Logout} color="inherit">
      Logout
    </Button>
  );
};

export default LogoutButton;
