const User = require("../models/user");
const generateToken = require("../lib/generateToken");

const createToken = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      console.log("auth error: user not found");
      res.status(401).json({ message: "auth error" });
    } else if (user.password !== password) {
      console.log("auth error: passwords do not match");
      res.status(401).json({ message: "auth error" });
    } else {
      const token = generateToken(user.id);
      res.status(201).json({ token: token, message: "OK" });
    }
  });
};

const AuthenticationController = {
  createToken: createToken,
};

module.exports = AuthenticationController;
