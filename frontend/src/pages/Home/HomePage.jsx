import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./HomePage.css";
import { LoginPage } from "../Login/LoginPage";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export const HomePage = () => {
  const { state } = useLocation();
  return (
    <div className="home">
      {state && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Alert
            data-testid="_message"
            severity="info"
            sx={{
              width: "50vw",
              mt: 2,
            }}
          >
            {state}
          </Alert>
        </Box>
      )}

      <h1>Welcome to Acebook!</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
};
