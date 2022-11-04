const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()
const router = require("./routes")
const {customErrorHandler} = require("./middlewares/ErrorHandler")
const app = express();
const cors = require('cors')

// socket server create
const server = require('http').createServer(app)
const io = require('socket.io')(server,{
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
})



// cors
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api", router)
//mongodb connection
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

// socket io 
//logic
let users = []

const addUser = (userId,socketId) => {
    !users.some(user=> user.userId === userId) && users.push({userId,socketId});
}
const removeUser = (socketId) => {
    users = users.filter(user=> user.socketId!== socketId);
}
const findUser = (userId) => {
    return users.find(user=> user.userId === userId);
}
//server
io.on("connection",(socket)=>{
    // when connected
    console.log('Client connected...');
    // take userid and socketId from user
    socket.on("add_user",(userId)=>{
        addUser(userId,socket.id)
        io.emit("get_users", users)
    })
    //when disconnected
    socket.on("disconnect",()=>{
        console.log('Client disconnected...');
        removeUser(socket.id)
        io.emit("get_users", users)
    })

    // send and get messages
    socket.on("send_message", ({senderId,receiverId,text})=>{
        const user = findUser(receiverId)
        io.to(user.socketId).emit("get_message",{
            senderId,
            text
        })
    })


})



app.use(customErrorHandler)
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>console.log(`server listening on port ${PORT}`))