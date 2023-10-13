import User from "../models/users.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { sendEmail } from "../helpers/email.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const payload = {
      username,
      email,
      password,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "10m" });

    const emailData = {
      from: EMAIL_ADDRESS,
      to: email,
      subject: "ACCOUNT ACTIVATION LINK",
      html: `
                <h1>Please use the following link to activate your account</h1>
                <hr />
                <p>${process.env.CLIENT_URL}/api/account-activation/${token}</p>
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `,
    };
    // res.send(emailData)
    sendEmail(req, res, emailData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const accountActivation = async (req, res) => {
  const { token } = req.body;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { username, email, password } = decoded;
      const user = new User({
        username,
        email,
        password,
      });

      await user.save();

      res.status(201).json({ message: "Account is activated" });
    } catch (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ error: "Expired link! Signup again" });
    }
  } else {
    res.send("Invalid token");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
