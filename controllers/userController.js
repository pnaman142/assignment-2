const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register an user
//@route POST /register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400).json({ message: "All fields are mandatory!" });
  }
  const userAvailable = await userName.findOne({ email });
  if (userAvailable) {
    res.status(400).json({ message: "User already registered!" });
  }
  //Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      status: "Success",
      data: {
        _id: user.id,
        email: user.email,
        password: user.password,
      },
    });
  } else {
    res.status(400).json({ message: "User data is not valid!!" });
  }
  res.json("Register new user..");
});

//@desc Login user
//@route POST /login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields are mandatory!!" });
  }
  const user = await User.findOne({ email });
  //compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({ status: "Success", token: accessToken });
  } else {
    res.status(401).json({ message: "Credentials are invalid" });
  }
});

module.exports = { registerUser, loginUser };
