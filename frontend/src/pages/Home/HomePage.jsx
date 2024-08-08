import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./HomePage.css";
import { LoginPage } from "../Login/LoginPage";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { useContext } from "react";
import Context from "../../components/Context/Context";

export const HomePage = () => {
  const { authStatus, setAuthStatus } = useContext(Context);
  const { state } = useLocation();
  const message = state || "";

  return (
    <>
      {!authStatus && (
        <>
          {message && message[0] === 0 && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Alert
                data-testid="_message"
                severity="success"
                sx={{
                  width: "50vw",
                  mt: 2,
                }}
              >
                {message[1]}
              </Alert>
            </Box>
          )}

          {message && message[0] === 1 && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Alert
                data-testid="_message"
                severity="info"
                sx={{
                  width: "50vw",
                  mt: 2,
                }}
              >
                {message[1]}
              </Alert>
            </Box>
          )}

          <h1 data-testid="_heading">Welcome to &#x1F525;cebook</h1>
          <LoginPage />
        </>
      )}

      {authStatus && (
        <>
          <h2 data-testid="_my-profile">Daily Classics</h2>
          <Card
            raised
            sx={{
              width: "77vh",
              margin: "0 auto",
              padding: "0em",
              mb: 3,
            }}
          >
            <CardMedia>
              {" "}
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/YVkUvmDQ3HY?si=lNj9udZn13cUSp2F"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" data-testid="_full-name">
                Eminem - Without Me
              </Typography>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

