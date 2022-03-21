const express = require("express")
const connect = require("./config/db")
const app = express();
const registerController = require("./controller/register.controller")
const loginController = require("./controller/login.controller")
const commentController = require("./controller/comments.controller")
const bookscontroller = require("./controller/books.controller")
const userscontroller = require("./controller/users.controller")

app.get("/", (req, res) => {
    return res.send("Listening at port 6000")
})

app.use("/register",registerController)
app.use("/login", loginController);
app.use("/comments", commentController);
app.use("/books", bookscontroller);
app.use("/users", userscontroller);

app.listen(6000, async (req, res) => {
    try {
        await connect();
        console.log("listening at port 6000")        
    } catch (error) {
        console.log(error.message)
    }

})