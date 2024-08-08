import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { login } from "../../services/authentication";

import { useContext } from "react";
import Context from "../../components/Context/Context";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { authStatus, setAuthStatus } = useContext(Context);
  const { state } = useLocation();
  const message = state || "";

  const [passwordValidator, setPasswordValidator] = useState("");
  const [emailValidator, setEmailValidator] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email.length < 1) {
      setEmailValidator("Email field cannot be empty");
    }

    if (password.length < 1) {
      setPasswordValidator("Password field cannot be empty");
    }

    if (password.length > 0 && email.length > 0) {
      const data = await login(email, password);
      // console.log(data)
      if (data.message === "OK") {
        setAuthStatus(true);
        localStorage.setItem("token", data.token);
        navigate("/posts");
      } else {
        navigate("/login", { state: [2, data] });
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      {authStatus && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Alert
            data-testid="_message"
            severity="warning"
            sx={{
              width: "50vw",
              mt: 2,
            }}
          >
            You are logged in. Please logout to sign in with new user.
          </Alert>
        </Box>
      )}

      {!authStatus && (
        <>
          {message && message[0] === 2 && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Alert
                data-testid="_message"
                severity="error"
                sx={{
                  width: "50vw",
                  mt: 2,
                }}
              >
                {message[1]}
              </Alert>
            </Box>
          )}
          <Card
            sx={{
              width: "50vh",
              margin: "0 auto",
              padding: "0.1em",
              mb: 3,
              mt: 10,
            }}
          >
            <CardHeader
              title="Login"
              subheader="Please enter credentials"
              style={{ textAlign: "left" }}
            />

            <CardContent
              component="form"
              id="login-form"
              onSubmit={handleSubmit}
            >
              {emailValidator && (
                <Alert data-testid="_message" severity="error" sx={{ mb: 3 }}>
                  {emailValidator}
                </Alert>
              )}

              <TextField
                inputProps={{
                  "data-testid": "_login-email",
                }}
                label="Email"
                fullWidth
                size="small"
                variant="outlined"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                sx={{ mb: 3 }}
              />
              {passwordValidator && (
                <Alert data-testid="_message" severity="error" sx={{ mb: 3 }}>
                  {passwordValidator}
                </Alert>
              )}
              <TextField
                inputProps={{
                  "data-testid": "_login-password",
                }}
                label="Password"
                fullWidth
                size="small"
                variant="outlined"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </CardContent>
            <CardActions>
              <Button
                data-testid="_submit-button"
                type="submit"
                form="login-form"
                variant="contained"
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </>
      )}
    </>
  );
};
