import User from "../models/users.js";

export const test = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error.");
  }
};
