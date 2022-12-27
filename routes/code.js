const express = require('express')
const {postCodes, getCodes} = require('./code_c.js')

const router = express.Router()

router.post("/post", postCodes)

router.get("/get", getCodes)

module.exports = router