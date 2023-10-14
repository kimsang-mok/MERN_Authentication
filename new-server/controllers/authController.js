import User from "../models/users.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { sendEmail } from "../helpers/email.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;

function encodeDotToHyphen(inputString) {
  return inputString.replace(/\./g, "-");
}

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const payload = {
      username,
      email,
      password,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "10m" });

    const encodedToken = encodeDotToHyphen(token);

    const emailData = {
      from: EMAIL_ADDRESS,
      to: email,
      subject: "ACCOUNT ACTIVATION LINK",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            /* Add your custom CSS styles here */
            .container {
              font-family: Arial, sans-serif;
              text-align: center;
              background-color: #f2f2f2;
              padding: 20px;
            }
            .header {
              background-color: #007BFF;
              padding: 20px;
            }
            .header h1 {
              color: #ffffff;
            }
            .content {
              background-color: #ffffff;
              padding: 20px;
            }
            .button {
              display: inline-block;
              background-color: #007BFF;
              color: #ffffff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
            }
            a[href] {
              color: #fffff
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Account Verification</h1>
            </div>
            <div class="content">
              <p>Hello there,</p>
              <p>Thank you for signing up with our service. To verify your account, please click the button below:</p>
              <a class="button" href="http://localhost:5173/api/account-activate/${encodedToken}">Verify Your Account</a>
              <p>Thank you for choosing our service!</p>
            </div>
          </div>
        </body>
        </html>
            `,
    };
    // res.send(emailData)
    sendEmail(req, res, emailData);
    console.log(token);
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
      return res.status(401).json({
        errors: [
          { msg: "User with that email does not exist. Please signup!" },
        ],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        exists: true,
        errors: [{ msg: "Password does not match." }],
      });
    }

    const { _id, username, role } = user;
    const userInfo = { _id, username, email, role };
    const payload = {
      userInfo,
    };
    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
      }

      res.json({ userInfo, token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
