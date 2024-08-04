import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import TextField from "@mui/material/TextField";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { getUser } from "../../services/users";
import { updateUser } from "../../services/users";

export const MyProfile = () => {
  const [mode, setMode] = useState("");
  const [user, setUser] = useState("");
  const [formData, setFormData] = useState("");

  const token = localStorage.getItem("token");

  if (token !== null) {
    useEffect(() => {
      getUser(jwtDecode(token).user_id).then((data) => {
        setUser(data);

        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          city: "",
          bio: "",
        });

        setMode(0);
      });
    }, []);
  }

  const handleUpdateFormData = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("onClick");
    await updateUser(formData);
    setMode(0);
  };

  // console.log(user);
  // console.log(mode);
  // console.log(formData);
  return (
    <>
      {token === null && <div>You are not logged in. Please login.</div>}

      {token !== null && mode === 0 && (
        <>
          <h2>My Profile</h2>
          <Card
            raised
            sx={{
              width: "50vh",
              margin: "0 auto",
              padding: "0.1em",
              mb: 3,
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
              <Typography gutterBottom variant="h5">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>City:</strong> {user.city}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Bio:</strong> {user.bio}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => setMode(1)}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        </>
      )}

      {token !== null && mode === 1 && (
        <>
          <h2>Edit Profile</h2>
          <Card
            raised
            sx={{
              width: "50vh",
              margin: "0 auto",
              padding: "0.1em",
              mb: 3,
            }}
          >
            <CardMedia
              component="img"
              image="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            />
            <CardContent
              component="form"
              id="my-profile-form"
              onSubmit={handleSubmit}
            >
              <TextField
                label="Edit First Name"
                fullWidth
                size="small"
                variant="outlined"
                id="edit-firstName"
                type="text"
                name="edit-firstName"
                value={formData.firstName}
                onChange={(e) =>
                  handleUpdateFormData("firstName", e.target.value)
                }
                sx={{ mb: 3 }}
              />
              <TextField
                label="Edit Last Name"
                fullWidth
                size="small"
                variant="outlined"
                id="edit-lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  handleUpdateFormData("lastName", e.target.value)
                }
                sx={{ mb: 3 }}
              />
              <TextField
                label={formData.city === "" ? user.city : "Edit City"}
                fullWidth
                size="small"
                variant="outlined"
                id="edit-city"
                type="text"
                name="city"
                value={formData.city}
                onChange={(e) => handleUpdateFormData("city", e.target.value)}
                sx={{ mb: 3 }}
              />
              <TextField
                label={formData.bio === "" ? user.bio : "Edit Bio"}
                fullWidth
                size="small"
                multiline
                rows={2}
                id="edit-bio"
                type="text"
                name="bio"
                value={formData.bio}
                onChange={(e) => handleUpdateFormData("bio", e.target.value)}
              />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => setMode(0)}
              >
                Cancel
              </Button>
              <Button type="submit" form="my-profile-form" variant="contained">
                Submit
              </Button>
            </CardActions>
          </Card>
        </>
      )}
    </>
  );
};
