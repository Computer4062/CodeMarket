const Comments = require("../model/Comments")

const postComment = async(req, res) => {  
    try{
        const comment = new Comments(req.body)
        await comment.save()
        res.status(200).send("account created")
    }catch(error){
        res.status(404).send(error)
        console.log(error)
    }
}

module.exports = {postComment}