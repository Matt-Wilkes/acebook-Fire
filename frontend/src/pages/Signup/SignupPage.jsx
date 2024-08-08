import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUpPage.css"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Icon from '@mui/material/Icon';
import Box from "@mui/material/Box";

import { signup } from "../../services/authentication";
import { IconButton, InputAdornment } from "@mui/material";

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    // firstName: "",
    // lastName: "",
    // email: "",
    // password: "",
    // confirmPassword: "",
    // image: ""
    // Tell coach about having the image as default empty string in the state,
    // which was in the payload of the request, overriding the other default
    // value defined in the model and/or controller
  });

  const [photoUrlPlaceholder, setPhotoUrlPlaceholder] = useState("accepted formats: PNG, JPG, BMP")

  const handleUpdateFormData = (id, value) => {

    if (formData.password !== formData.confirmPassword) {
      <Alert data-testid="_message" severity="error" sx={{ mb: 3 }}>
        Last Name cannot be empty
      </Alert>
    }
    setFormData({ ...formData, [id]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(formData);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
  };

  const handlePaste = async (target) => {
    console.log(target)
    const text = await navigator.clipboard.readText()
    if (text) {
      setPhotoUrlPlaceholder("")
    }
    setFormData({ ...formData, "image": text })
  }


  return (
    <>
      <Card sx={{ maxWidth: 380 }} style={{ margin: "2em", overflow: 'hidden' }}>


        <CardContent data-testid="user-card">
          <Typography gutterBottom variant="p" component="div">
            <label htmlFor="firstName">First Name</label>
          </Typography>
          <TextField
            inputProps={{
              "data-testid": "none",
            }}
            label="e.g. John"
            fullWidth
            size="small"
            variant="outlined"
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={(e) =>
              handleUpdateFormData("firstName", e.target.value)
            }
            sx={{ mb: 3 }}
          />
          <Typography gutterBottom variant="p" component="div">
            <label htmlFor="lastName">Last Name</label>
          </Typography>
          <TextField
            inputProps={{
              "data-testid": "none",
            }}
            label="e.g. Smith"
            fullWidth
            size="small"
            variant="outlined"
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={(e) =>
              handleUpdateFormData("lastName", e.target.value)
            }
            sx={{ mb: 3 }}
          />


          <Typography gutterBottom variant="p" component="div">
            <label htmlFor="email">Email</label>
          </Typography>
          <TextField
            inputProps={{
              "data-testid": "none",
            }}
            label="john@example.com"
            fullWidth
            size="small"
            variant="outlined"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              handleUpdateFormData("email", e.target.value)
            }
            sx={{ mb: 3 }}
          />


          <Typography gutterBottom variant="p" component="div">
            <label htmlFor="password">Password</label>
          </Typography>
          <TextField
            inputProps={{
              "data-testid": "none",
            }}
            label="Choose a strong one"
            fullWidth
            size="small"
            variant="outlined"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              handleUpdateFormData("password", e.target.value)
            }
            sx={{ mb: 3 }}
          />

          <Typography gutterBottom variant="p" component="div">
            <label htmlFor="confirmPassword">Confirm Password</label>
          </Typography>
          <TextField
            inputProps={{
              "data-testid": "none",
            }}
            label="Confirm it"
            fullWidth
            size="small"
            variant="outlined"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              handleUpdateFormData("confirmPassword", e.target.value)
            }
            sx={{ mb: 3 }}
          />


          <Typography gutterBottom variant="p" component="div">
            <label htmlFor="image">Profile Photo URL</label>
          </Typography>
          <TextField
            InputProps={{
              "data-testid": "none",
              endAdornment: (
                <InputAdornment position="end">
                  {/* <IconButton edge="end" color="primary"> */}
                  <ContentPasteIcon onClick={(e) => handlePaste(e)} />
                  {/* </IconButton> */}
                </InputAdornment>
              ),
            }}
            label={photoUrlPlaceholder}
            fullWidth
            size="small"
            variant="outlined"
            id="image"
            type="text"
            name="image"
            value={formData.image}
            onChange={(e) =>
              handleUpdateFormData("image", e.target.value)
            }
            sx={{ mb: 3 }}
          />


          {/* <Typography variant="body1" color="text.secondary">
          {firstName}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {lastName}
        </Typography> */}

          <Typography variant="body1" color="text.secondary">
            {/* {email} */}
          </Typography>

        </CardContent>

        <CardActions>
          {/* <button style={{ color: "blue" }} size="small">{button1Text}</button> */}
          <Button variant="outlined">
            {/* {button1Text} */}
            Submit
          </Button>
          {/* <Button>
          {button2Text}
        </Button> */}
        </CardActions>

      </Card>








      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          placeholder="e.g. John"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={(e) => handleUpdateFormData("firstName", e.target.value)}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          placeholder="e.g. Smith"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={(e) => handleUpdateFormData("lastName", e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          placeholder="e.g. john@mail.com"
          name="email"
          type="text"
          value={formData.email}
          onChange={(e) => handleUpdateFormData("email", e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          placeholder="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleUpdateFormData("password", e.target.value)}
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleUpdateFormData("confirmPassword", e.target.value)}
        />
        <label htmlFor="image">Profile Photo (URL)</label>
        <input
          id="image"
          placeholder="accepted formats: PNG, JPG, BMP"
          name="image"
          type="text"
          value={formData.image}
          onChange={(e) => handleUpdateFormData("image", e.target.value)}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};
