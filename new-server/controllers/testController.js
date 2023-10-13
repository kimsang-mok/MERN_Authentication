import User from "../models/users.js";

export const test = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json({ user: user, msg: "hello" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
};
