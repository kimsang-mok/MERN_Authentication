import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      max: 32,
      required: [true, "Name field cannot be empty"],
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: [true, "Email is already used."],
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: [true, "Password field cannot be empty"],
    },
    salt: String,
    role: {
      type: String,
      default: "subcriber",
    },
    resetPasswordLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

const User = mongoose.model("User", userSchema);
export default User;
