import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { getUser } from "../../services/users";

export const MyProfile = () => {
  const [user, setUser] = useState("");
  const token = localStorage.getItem("token");

  if (token !== null) {
    useEffect(() => {
      getUser(jwtDecode(token).user_id).then((data) => {
        setUser(data);
      });
    }, []);
  }

  return (
    <>
      {token === null && <div>You are not logged in. Please login.</div>}
      {token !== null && (
        <>
          <h2>My Profile</h2>
          <Card
            raised
            sx={{
              maxWidth: 280,
              margin: "0 auto",
              padding: "0.1em",
            }}
          >
            <CardMedia
              component="img"
              image="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            />
            <CardContent
              sx={{
                textAlign: "left",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  maxWidth: 280,
                  margin: "0 auto",
                  padding: "0.1em",
                }}
              >
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <div>Email: {user.email}</div>
                <div>City: {user.city}</div>
                <div>Bio: {user.bio}</div>
              </Typography>
            </CardContent>

            <CardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
            </CardActions>
          </Card>
        </>
      )}
    </>
  );
};
