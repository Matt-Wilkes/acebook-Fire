const User = require("../models/user");

const object = {


}

const create = (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, image } = req.body;

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    city: "No city added",
    bio: "No bio added",
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


const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users: users });
}

// const getUser = async (req, res) => {
//   const userId = req.params.userId
//   const user = await User.findById(userId)
//   res.status(200).json({ user })
// }

const findUserById = async (req, res) => {
  // console.log(req.headers.user_id); // <-- this is what comes from frontend (user_id extracted from JWT token)
  const user = await User.findOne({ _id: req.headers.user_id });
  // console.log(user);
  res.status(200).json({
    user_id: user["_id"].toString(),
    firstName: user["firstName"],
    lastName: user["lastName"],
    email: user["email"],
    city: user["city"],
    bio: user["bio"],
  });
};

const updateUserById = async (req, res) => {
  // console.log(req.body);
  if (!req.body.city) {
    req.body.city = "No city added"
  }
  if (!req.body.bio) {
    req.body.bio = "No bio added"
  }

  await User.findOneAndUpdate(
    { _id: req.body.user_id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        bio: req.body.bio,
      },
    },
    { new: false }
  );

  res.status(200).json({ message: "Profile updated" });

};

const UsersController = {
  create: create,
  getAllUsers: getAllUsers,
  // getUser: getUser,
  findUserById: findUserById,
  updateUserById: updateUserById

};

module.exports = UsersController;
