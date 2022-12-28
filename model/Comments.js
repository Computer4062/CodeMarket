const mongoose = require('mongoose')

const Comment = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Comment", Comment)