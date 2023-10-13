import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  // console.log(token);
  // console.log(process.env.JWT_SECRET);

  // check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

export default auth;
