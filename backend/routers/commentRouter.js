const express = require("express")
const router = express.Router()

//Controllers
const commentController = require("../controllers/commentController.js")
//Middlewares


//INDEX
router.get("/", commentController.index)

//STORE
router.post("/", commentController.store)


module.exports = router