const express = require("express");
const Comment = require("../model/comment.model");
const router = express.Router();

router.post("/", async (req, res) =>
{
    try {
        const comment = await Comment.create(req.body)
        return res.send(comment)
        
    } catch (error) {
        return res.send(error.message)
    }
})

module.exports = router;