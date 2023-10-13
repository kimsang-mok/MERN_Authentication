import { check } from "express-validator";

const usernamePattern = /^[A-Za-z0-9_]+$/;

export const signupValidator = [
  check("username")
    .not()
    .isEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long")
    .matches(usernamePattern)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export const loginValidator = [
  check("email").isEmail().withMessage("Invalid email address"),
  check("password").not().isEmpty().withMessage("Password cannot be empty"),
];
