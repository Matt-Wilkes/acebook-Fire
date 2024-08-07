import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import { useState } from "react";
import { useNavigate} from "react-router-dom";

import { useContext } from "react";
import Context from "../../components/Context/Context";

import "./signUpPage.css";

import { signup } from "../../services/authentication";

export const SignupPage = () => {
  const { authStatus, setAuthStatus } = useContext(Context);

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

  const handleUpdateFormData = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await signup(formData);
      // console.log("redirecting...:");
      navigate("/login", {state: data.message});
    } catch (err) {
      console.error(err);
      navigate("/signup");
    }
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
            You are logged in. Please logout to signup with new user.
          </Alert>
        </Box>
      )}

      {!authStatus && (
        <>
          <h2>Signup</h2>
          <form
            className="signup-form"
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              placeholder="e.g. John"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                handleUpdateFormData("firstName", e.target.value)
              }
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
              onChange={(e) =>
                handleUpdateFormData("confirmPassword", e.target.value)
              }
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
