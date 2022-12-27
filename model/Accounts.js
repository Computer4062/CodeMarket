const mongoose = require('mongoose')

const accounts = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    userpassword:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    profile:{
        type: String,
        required: true,
    }
})

module.exports =  mongoose.model("RegisteredAccounts", accounts)