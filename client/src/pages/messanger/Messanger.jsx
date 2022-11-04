import "./messanger.css";
import Topbar from "../../components/topbar/Topbar"
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import {useSelector} from "react-redux";
import {allConversation,allMessages,newOneMessage} from '../../Http'
import { useEffect, useRef, useState } from "react";
import {io} from "socket.io-client";

const Messanger = () => {
const {user} = useSelector(state=>state.Auth)

const [conversations , setConversations] = useState([])
const [messages , setMessages] = useState([])
const [currentChat , setCurrentChat] = useState(null)
const [sendNewMessage, setSendNewMessage] = useState('')
const [arivalMessage, setArivalMessage] = useState(null)
const [onllineUsers, setOnlineUsers] = useState([])



const handleClick = async () => {

  const data = {
    conversationId: currentChat._id,
    sender: user._id,
    text: sendNewMessage
  }

  const friendId = currentChat.members.find(m=> m !== user._id)

  socket.current.emit("send_message",{
    senderId: user._id,
    receiverId: friendId,
    text: sendNewMessage
  })

  try{
    const res = await newOneMessage(data)
    setMessages([...messages, res.data])
    setSendNewMessage("")
  }catch(err){
    console.log(err);
  }

}

// get all conversations
useEffect(()=>{
  const getAllConversations = async () => {
    try{
      const res = await allConversation(user._id)
      setConversations(res.data)
    }catch(err){
      console.log(err);
    }
  }
  getAllConversations()
},[user])
// get all messages
useEffect(()=>{
  if(currentChat === null) return;
  const getAllMessages = async () => {
    try{
      const res = await allMessages(currentChat?._id)
      setMessages(res.data)
    }catch(err){
      console.log(err);
    }
  }
  getAllMessages()
},[currentChat])

// scroll to end of message
const scrollRef = useRef()
useEffect(()=>{
  scrollRef.current?.scrollIntoView({behavior:"smooth"})
},[messages])

// io
const socket = useRef(io("http://localhost:5000"))

useEffect(()=>{
  socket.current.emit("add_user",user._id)
  socket.current.on("get_users", (users)=>{
    setOnlineUsers(users)
  })
},[user._id])

// get socket message
useEffect(()=>{
  socket.current.on("get_message", (data)=>{
    setArivalMessage({
      sender : data.senderId,
      text: data.text,
      createdAt: Date.now()
    })
  })
},[])

// update massege for friend message
useEffect(()=>{
  arivalMessage && currentChat?.members.includes(arivalMessage.sender) && setMessages(prev=>[...prev, arivalMessage])
},[arivalMessage,currentChat?.members])

  return (
    <>
      <Topbar />
      <div className='messanger'>
        <div className="chatMenu">
          <div className="chatWrapper">
            <input type="text" placeholder='Search for friends....'/>
            <div className="conversationWrapper">
              {conversations && conversations.map(c=>(
                <div key={c._id} onClick={()=>setCurrentChat(c)}>
                <Conversation data={c} user={user}/>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="boxWrapper">
            {
              currentChat ? (<>
                <div className="chatBoxTop">
                {messages && messages.map(m=>(
                  <div key={m._id} ref={scrollRef}>
                    <Message message={m} user={user} own={m.sender === user._id}/>
                  </div>
                  ))}                
                </div>
              <div className="chatBoxBottom">
                <textarea placeholder='Aa...' onChange={(e)=>setSendNewMessage(e.target.value)} value={sendNewMessage}></textarea>
                <button onClick={handleClick}>Send</button>
              </div>
              </>)
              :<span className="Others">Open a Conversation to start a chat...</span>
            }
          </div>
        </div>
        <div className="chatOnline">
          <div className="onlineWrapper">
            <ChatOnline onllineUsers={onllineUsers} user={user} setCurrentChat={setCurrentChat}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Messanger;