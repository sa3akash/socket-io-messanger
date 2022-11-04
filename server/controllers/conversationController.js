const Conversation = require("../models/Conversation")

const conversationController = {
    async create(req,res,next) {

        const {senderId,receiverId} = req.body;

        const newConversation = new Conversation({
            members:[senderId, receiverId]
        })

        try{
            const alreadyConversation = await Conversation.findOne({members:{$in:[senderId,receiverId]}})
            if(alreadyConversation){
                return res.status(200).json(alreadyConversation)
            }else{
                const result = await newConversation.save()
                return res.status(200).json(result)
            }
        }catch(err){
            return next(err);
        }
    },

    async getConversation(req,res,next) {
        try{
            const result = await Conversation.find({
                members: {$in: [req.params.userId]}
            })
            return res.status(200).json(result)
        }catch(err){
            return next(err);
        }
    },
}

module.exports = conversationController;