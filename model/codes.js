const mongoose = require('mongoose')

const Codes = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    APIkey:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    category:{
        type: String, 
        required: true
    },
    html:{
        type:String,
    },
    css:{
        type:String,
    },
    js:{
        type:String,
    },
    created:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("codes", Codes)