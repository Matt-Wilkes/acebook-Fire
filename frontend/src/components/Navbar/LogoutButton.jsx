import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { state: "You were logged out" });
  };

  return <button onClick={Logout}>Logout</button>;
};

export default LogoutButton;
