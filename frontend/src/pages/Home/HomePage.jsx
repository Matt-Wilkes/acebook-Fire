import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./HomePage.css";
import { LoginPage } from "../Login/LoginPage";

import Alert from "@mui/material/Alert";

export const HomePage = () => {
  const { state } = useLocation();
  return (
    <div className="home">
      {state && (
        <Alert data-testid="_message" severity="info">
          {state}
        </Alert>
      )}
      <h1>Welcome to Acebook!</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
};
