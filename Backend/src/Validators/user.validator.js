import { body } from "express-validator";

export const registerValidator = [
  body("userName")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 chars"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),

  body("avatar")
    .optional()
    .isURL().withMessage("Avatar must be a valid URL"),

  body("gender")
    .notEmpty().withMessage("Gender is required")
    .isIn(["male", "female", "others"])
    .withMessage("Invalid gender"),

  body("bio")
    .optional()
    .isLength({ max: 200 }).withMessage("Bio too long"),
];



export const loginValidator = [
  body("userName")
    .notEmpty().withMessage("userName is required"),

  body("password")
    .notEmpty().withMessage("Password is required"),
];