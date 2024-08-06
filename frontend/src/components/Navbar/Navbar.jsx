import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useContext } from "react";
import Context from "../Context/Context";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { authStatus, setAuthStatus } = useContext(Context);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        data-testid="_nav"
        position="static"
        color="transparent"
        sx={{
          width: "100vw",
        }}
      >
        <Toolbar>
          <Typography component={Link} to="/" color="inherit" variant="h6">
            &#x1F525;cebook
          </Typography>
          {!authStatus && (
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                component={Link}
                to="/"
                data-testid="_home"
                color="inherit"
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/login"
                data-testid="_login"
                color="inherit"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                data-testid="_signup"
                color="inherit"
              >
                Signup
              </Button>
            </Box>
          )}
          {authStatus && (
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                component={Link}
                to="/my-profile"
                data-testid="_my-profile"
                color="inherit"
              >
                My Profile
              </Button>
              <Button
                component={Link}
                to="/posts"
                data-testid="_posts"
                color="inherit"
              >
                Posts
              </Button>
              <LogoutButton />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
