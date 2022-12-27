const express = require("express")
const {create} = require('./Register_c.js')

const router = express.Router()

router.post("/create", create)

module.exports = router