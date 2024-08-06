import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { useContext } from "react";
import Context from "../../components/Context/Context";

import { getUser } from "../../services/users";
import { updateUser } from "../../services/users";

export const MyProfile = () => {
  const { authStatus, setAuthStatus } = useContext(Context);

  const [mode, setMode] = useState(0);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      fetchGetUser(token);
    }
  }, [token]);

  const fetchGetUser = async (token) => {
    const data = await getUser(jwtDecode(token).user_id);
    setUser(data);
    setFormData({
      user_id: jwtDecode(token).user_id,
      firstName: data.firstName,
      lastName: data.lastName,
      city: data.city,
      bio: data.bio,
      image: "",
    });
  };

  const handleUpdateFormData = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.firstName.length > 0 && formData.lastName.length > 0) {
      const data = await updateUser(token, formData);
      fetchGetUser(token);
      setMessage(data.message);
      setMode(0);
    }
  };

  // console.log(mode);
  // console.log(user);
  // console.log(formData);
  // console.log(message);

  return (
    <>
      {!authStatus && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Alert
            data-testid="_message"
            severity="warning"
            sx={{
              width: "50vw",
              mt: 2,
            }}
          >
            You are not logged in. Please login.
          </Alert>
        </Box>
      )}

      {authStatus && mode === 0 && (
        <>
          <h2 data-testid="_my-profile">My Profile</h2>
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
              image={user.image}
              data-testid="_image"
            />
            <CardContent
              sx={{
                textAlign: "left",
              }}
            >
              {message && (
                <Alert data-testid="_message" severity="success">
                  {message}
                </Alert>
              )}
              <Typography gutterBottom variant="h5" data-testid="_full-name">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                data-testid="_email"
              >
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                data-testid="_city"
              >
                <strong>City:</strong> {user.city}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                data-testid="_bio"
              >
                <strong>Bio:</strong> {user.bio}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => setMode(1)}
                data-testid="_edit-button"
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        </>
      )}

      {authStatus && mode === 1 && (
        <>
          <h2 data-testid="_edit-profile">Edit Profile</h2>
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
              image={user.image}
              data-testid="_image-edit"
            />
            <CardContent
              component="form"
              id="my-profile-form"
              onSubmit={handleSubmit}
            >
              {formData.firstName.length === 0 && (
                <Alert data-testid="_message" severity="error" sx={{ mb: 3 }}>
                  First Name cannot be empty
                </Alert>
              )}
              <TextField
                inputProps={{
                  "data-testid": "_first-name-field",
                }}
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
              {formData.lastName.length === 0 && (
                <Alert data-testid="_message" severity="error" sx={{ mb: 3 }}>
                  Last Name cannot be empty
                </Alert>
              )}
              <TextField
                inputProps={{
                  "data-testid": "_last-name-field",
                }}
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
                inputProps={{
                  "data-testid": "_city-field",
                }}
                label="Edit City"
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
                inputProps={{
                  "data-testid": "_bio-field",
                }}
                label="Edit Bio"
                fullWidth
                size="small"
                multiline
                rows={2}
                id="edit-bio"
                type="text"
                name="bio"
                value={formData.bio}
                onChange={(e) => handleUpdateFormData("bio", e.target.value)}
                sx={{ mb: 3 }}
              />
              <TextField
                inputProps={{
                  "data-testid": "_picture-url-field",
                }}
                label="Picture URL"
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
                variant="outlined"
                id="edit-picture"
                type="text"
                name="picture"
                value={formData.image}
                onChange={(e) => handleUpdateFormData("image", e.target.value)}
              />
            </CardContent>
            <CardActions>
              <Button
                data-testid="_cancel-button"
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => {
                  setMode(0);
                  setMessage("");
                }}
              >
                Cancel
              </Button>
              <Button
                data-testid="_submit-button"
                type="submit"
                form="my-profile-form"
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
