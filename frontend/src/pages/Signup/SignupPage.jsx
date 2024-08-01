import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUpPage.css"

import { signup } from "../../services/authentication";

export const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleUpdateFormData = (id, value) => {
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


  return (
    <>
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="firstName">First Name:</label>
        <input
        placeholder="e.g. John"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={(e) => handleUpdateFormData("firstName", e.target.value)}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
        placeholder="e.g. Smith"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={(e) => handleUpdateFormData("lastName", e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
        placeholder="e.g. john@mail.com"
          name="email"
          type="text"
          value={formData.email}
          onChange={(e) => handleUpdateFormData("email", e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleUpdateFormData("password", e.target.value)}
        />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
      placeholder="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => handleUpdateFormData("confirmPassword", e.target.value)}
      />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};
