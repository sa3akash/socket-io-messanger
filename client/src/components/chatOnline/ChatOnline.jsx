import { useState } from 'react';
import "./chatOnline.css"
import {allPeople,createConversation} from "../../Http"
import { useEffect } from 'react';

const ChatOnline = ({onllineUsers,user,setCurrentChat}) => {
  const [people, setPeople] = useState([])


  useEffect(()=>{
    const getAllPeople = async () => {
      try{
        const res = await allPeople()
        setPeople(res.data.filter(p=>p._id !== user._id))
      }catch(err){
        console.log(err)
      }
    }
    getAllPeople()
  },[user._id])


const handleClick = async (f) => {
  const data = {
    senderId: user._id,
    receiverId: f._id
  }

  try{
    console.log(data)
    const res = await createConversation(data)
    setCurrentChat(res.data)
  }catch(err){
    console.log(err);
  }
}
  return (
    <>
      {people && people.map((p=>(
      <div className='chatOnlien' key={p._id} onClick={()=>handleClick(p)}>
          <div className="friendOnline">
              <img src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1727&q=80" alt="avater" />
              <div className="onlineBadge"></div>
          </div>
          <span>{p?.username}</span>
      </div>
      )))}
    </>
  )
}

export default ChatOnline