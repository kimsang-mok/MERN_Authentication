import User from "../models/users.js";

export const signup = async (req, res) => {
  
}

// export const signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({
//         error: "Email is already taken.",
//       });
//     }

//     const newUser = new User({ name, email, password });
//     await newUser.save();

//     res.json({
//       message: "Signup success",
//     });
//   } catch (err) {
//     return res.status(500).json({
//       error: "Internal Server error",
//     });
//   }
// };
