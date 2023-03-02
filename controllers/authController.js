const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const addAdmin = async (req, res) => {
  try {
    //Get Admin Details
    const { name, email, password } = req.body;

    console.log(name);

    if (!name) return res.json({ Error: "Username Required", status: false });
    if (!email) return res.json({ Error: "Email Required", status: false });
    if (!password)
      return res.json({ Error: "Password Required", status: false });

    //Check If UserName Exist
    const checkUsername = await Admin.findOne({ name });
    if (checkUsername)
      return res.json({ Error: "Username already used", status: false });

    //Check If Email Exist
    const checkEmail = await Admin.findOne({ email });
    if (checkEmail)
      return res.json({ Error: "Email already used", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    //Create Model
    const admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    //Send Data in DataBase
    await admin.save();

    res.status(201).json("Admin Added");
  } catch (error) {
    //Send Error
    console.log(error);
    res.send(error);
  }
};

const login = async (req, res) => {
  try {
    //Get Login Details
    const { email, password } = req.body;

    //Find if Admin Exist in Database
    const admin = await Admin.findOne({ email });

    if (!admin)
      return res.json({ msg: "Incorrect email or Password", status: false });

    // Check Password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid)
      return res.json({ msg: "Incorrect email or Password", status: false });

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({ message: "Login Success", token: token });
  } catch (error) {
    //Send Error Message
    res.send("Not authorized");
  }
};

const getAdmin = async (req, res) => {
  try {
    //Get all projects from database
    const project = await Admin.find();
    res.status(200).send(project);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { addAdmin, login, getAdmin };
