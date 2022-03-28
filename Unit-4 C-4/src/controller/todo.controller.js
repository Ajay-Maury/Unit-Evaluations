const express = require("express");
const authenticate = require("../middleware/authenticate");
const Todo = require("../models/todo.model");
const router = express.Router();

router.get("",authenticate ,async (req, res) => {
    try {
        userId = req.user._id;
        const todos = await Todo.find({email:userId.email}).lean().exec();
        return res.send(todos)
    } catch (error) {
        return res.send(error.message)
    }
})

router.post("", authenticate, async (req, res) => {
    try {        
        req.body.userId = req.user._id
        const todo = await Todo.create(req.body)
        return res.send(todo)
    } catch (error) {
        return res.send(error.message)
    }
})

router.get("/:id", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await Todo.findById(req.params.id)
          .populate("userId")
          .lean()
          .exec();
        if (user.userId.email == userId.email) {
             const todo = await Todo.findById(req.params.id).lean().exec();
          return res.send(todo);
        } else {
          return res.status(401).send("Unauthorized Access");
        }           
    } catch (error) {
        return res.send(error.message)
    }
})


router.patch("/:id", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
        let user = await Todo.findById(req.params.id)
          .populate("userId")
          .lean()
          .exec();
        if (user.userId.email == userId.email) {
            const todo = await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true})
          return res.send(todo);
        } else {
          return res.status(401).send("Unauthorized Access");
        }           
    } catch (error) {
        return res.send(error.message)
    }
})

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const userId = req.user._id;
       let user = await Todo.findById(req.params.id)
         .populate("userId")
         .lean()
         .exec();
       if (user.userId.email == userId.email) {
        const todo = await Todo.findByIdAndDelete(req.params.id, req.body, {
           new: true,
         });
         return res.send(todo);
       } else {
         return res.status(401).send("Unauthorized Access");
       }           
    } catch (error) {
        return res.send(error.message)
    }
})

module.exports = router