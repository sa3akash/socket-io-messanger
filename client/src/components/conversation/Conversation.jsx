import { useEffect } from 'react';
import { useState } from 'react';
import "./conversation.css";
import {oneUser} from "../../Http"

const Conversation = ({data,user}) => {
  const [friendUser, setFriendUser] = useState(null)


  useEffect(()=>{
    const friendId = data.members.find(i=>user._id !== i);
    const getOneUer = async () => {
      try{
        const res = await oneUser(friendId)
        setFriendUser(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getOneUer()
  },[data,user])
  return (
    <div className='conversation'>
        <img src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1727&q=80" alt="avater" />
        <span>{friendUser?.username}</span>
    </div>
  )
}

export default Conversation