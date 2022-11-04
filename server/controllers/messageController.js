const Message = require("../models/Message")

const messageController = {
    async create(req,res,next) {
        const newMessage = new Message(req.body)
        try{
            const result = await newMessage.save()
            return res.status(200).json(result)
        }catch(err){
            return next(err);
        }
    },

    async getMessage(req,res,next) {
        try{
            const result = await Message.find({
                conversationId: req.params.conversationId
            })
            return res.status(200).json(result)
        }catch(err){
            return next(err);
        }
    },
}

module.exports = messageController;