const {postComment} = require("./Comments_c")
const express = require("express")

const router = express.Router()

router.post("/post", postComment)

module.exports = router