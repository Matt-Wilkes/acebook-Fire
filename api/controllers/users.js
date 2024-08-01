const User = require("../models/user");

const create = (req, res) => {
  const {firstName,lastName, email, password, confirmPassword} = req.body;
  // const lastName = req.body.lastName;
  // const email = req.body.email;
  // const password = req.body.password;
  // const confirmPassword = req.body.confirmPassword;
  console.log(req.body)

  const user = new User({ firstName, lastName, email, password, confirmPassword });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
};

const UsersController = {
  create: create,
};

module.exports = UsersController;
