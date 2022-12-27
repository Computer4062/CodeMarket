const Accounts = require("../model/Accounts.js")

const create = async(req, res) => {  
    try{
        const Codes = new Accounts(req.body)
        await Codes.save()
        res.status(200).send("account created")
    }catch(error){
        res.status(404).send(error)
        console.log(error)
    }
}

module.exports = {create}