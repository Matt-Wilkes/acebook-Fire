const User = require("../models/user");

const object = {


}

const create = (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, image } = req.body;

  const user = new User({ firstName, lastName, email, password, confirmPassword, image });
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


const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users: users });
}

const getUser = async (req, res) => {
  const userId = req.params.userId
  const user = await User.findById(userId)
  res.status(200).json({ user })
}

const UsersController = {
  create: create,
  getAllUsers: getAllUsers,
  getUser: getUser,
};

module.exports = UsersController;
