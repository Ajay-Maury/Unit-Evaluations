const express = require("express")
const router = express.Router()
const User = require("../model/user.model")

router.get("/", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.limit || 10;
    const offset = (page - 1) * size;

    const count = Math.ceil(
      (await User.find({}).countDocuments().lean().exec()) / size
    );

    const users = await User.find({}).skip(offset).limit(size).lean().exec();

    return res.send({ users: users, "Total Pages": count });
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;