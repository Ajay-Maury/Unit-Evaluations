const express = require("express")
const Book = require("../model/book.model")
const upload = require("../middleware/fileuploads");
const router = express.Router()

router.post("",upload.single(coverImage) ,async (req, res) => {
    try {
        const book = await Book.create({
          likes: req.body.likes,
          coverImage: req.file.path,
          content: req.body.content,
          authorId: req.body.authorId,
          publicationId: req.body.publicationId,
          commentId: req.body.commentId,
        });
        return res.send(book)
    } catch (error) {
       return res.send(erroe.message)
    }
})

module.exports = router;