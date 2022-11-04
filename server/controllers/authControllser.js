const User = require("../models/User")
const bcrypt = require("bcrypt")
const {createError} = require("../middlewares/ErrorHandler")

const AuthController = {
    async register(req,res,next){

        const hashPassword = bcrypt.hashSync(req.body.password,10)
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password: hashPassword
        })
        try{
            const user = await User.findOne({$or:[{username:req.body.username},{email:req.body.email}]})
            if(user) return next(createError(409,"User already exists"));
            
            const result = await newUser.save()
            const {password,...others} = result._doc;
            res.status(201).json(others)
        }catch(err){
            return next(err);
        }
    },

    async login(req,res,next){
        try{
            const user = await User.findOne({email:req.body.email})
            if(!user) return next(createError(403,"Wrong Credentials"));
            const compare = bcrypt.compareSync(req.body.password, user.password);
            if(!compare) return next(createError(403,"Wrong Credentials"));

            const {password,...others} = user._doc;
            res.status(200).json(others)
        }catch(err){
            return next(err);
        }
    },
    async getOne(req,res,next){
        try{
            const user = await User.findOne({_id:req.params.id})
            const {password,...others} = user._doc;
            res.status(200).json(others)
        }catch(err){
            return next(err);
        }
    },
    async getAll(req,res,next){
        try{
            const user = await User.find().select("-password")
            res.status(200).json(user)
        }catch(err){
            return next(err);
        }
    },
}


module.exports = AuthController;