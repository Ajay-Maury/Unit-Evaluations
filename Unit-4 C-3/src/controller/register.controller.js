const express = required("express")
const router = express.Router();
const upload = require("../middleware/fileuploads")
const User = require("../model/user.model");
const {body,validationResult} = require("express-valodator")
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

router.post(
  "/",
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Name should be of minimum 3 and maximum 30 characters"),
  body("lastName")
    .isLength({ min: 3, max: 30 })
    .withMessage("Name should be of minimum 3 and maximum 30 characters"),
  body("age")
    .not()
    .isEmpty()
    .isNumeric()
    .custom((value) => {
      if (value < 1 || value > 150) {
        throw new Error("Age must be between 1  - 150");
      }
      return true;
    }),
  body("email")
    .isEmail()
    .custom(async (value) => {
      const em = await User.findOne({ email: value }).lean().exec();
      if (em) {
        throw new Error("Email already exists");
      }
      return true;
    }),
  upload.single("profileImages"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      //   console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        profileImages: req.file.path,
      });
      const token = generateToken(user);
      return res.send({ user, token });
    } catch (error) {
      return res.send(error.message);
    }
  }
);

module.exports = router;