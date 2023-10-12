import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/users.js";
dotenv.config();

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
