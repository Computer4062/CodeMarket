const codes =  require("../model/codes.js")

const postCodes = async(req, res) => {
    try{
        const Codes = new codes(req.body)
        await Codes.save()
    }catch(error){
        res.status(404).send(error)
        console.log(error)
    }
}

const getCodes = async(req, res) => {
    try{
        const product = await codes.find().sort({created: 'desc'})
        res.status(200).send(product)
    }catch(error){
        console.log(error)
    }
}


module.exports = {postCodes, getCodes}