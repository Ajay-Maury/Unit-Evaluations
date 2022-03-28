const express = require("express")
const connect = require("./config/db")
const todoController = require("./controller/todo.controller")
const {register,login} = require("./controller/auth.controller")
const app = express();

app.use(express.json())
app.get("", (req, res) => {
    return res.send("Port is working")
})

app.post("/login",login)
app.post("/register",register)
app.use("/todos",todoController)

app.listen(4000, async (req, res) => {
    try {
        await connect();
        console.log("Listening at 4000")
    } catch (error) {
        console.log(error.message)
    }
})