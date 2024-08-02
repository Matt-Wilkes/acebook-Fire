const User = require("../models/user");

const create = (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  // const lastName = req.body.lastName;
  // const email = req.body.email;
  // const password = req.body.password;
  // const confirmPassword = req.body.confirmPassword;
  console.log(req.body);

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });
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

const findUserById = async (req, res) => {
  console.log(req.headers.user_id); // <-- this is what comes from frontend user_id extracted from JWT token
  const user = await User.find({ _id: req.headers.user_id });
  // const user = await User.find({"_id" : ObjectId(req.user_id)});
  res.status(200).json({ user: user });
};

const UsersController = {
  create: create,
  findUserById: findUserById,
};

module.exports = UsersController;
