import User from "../models/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { log } from "console";
import { sendEmail } from "../helpers/email.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      username,
      email,
      password,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "10d" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

    const emailData = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "ACCOUNT ACTIVATION LINK",
      html: `
                <h1>Please use the following link to activate your account</h1>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>http://localhost:3000</p>
            `,
    };
    sendEmail(req, res, emailData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
