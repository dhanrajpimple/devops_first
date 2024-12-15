const express = require("express")
const router = express.Router()
const {addTodo, getTood, deletetodo}  = require("../controller/todo.controller")


router.post("/add", addTodo)
router.get("/get", getTood)
router.delete("/delete", deletetodo)


module.exports = router;