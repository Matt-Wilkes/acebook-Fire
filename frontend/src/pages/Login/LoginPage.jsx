import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await login(email, password);
    // console.log(data)
    if (data.message === "OK") {
      setAuthStatus(true);
      localStorage.setItem("token", data.token);
      navigate("/posts");
    } else {
      navigate("/login", { state: [2, data] });
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
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              role="submit-button"
              id="submit"
              type="submit"
              value="Submit"
            />
          </form>
        </>
      )}
    </>
  );
};
