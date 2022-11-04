import React from 'react';
import "./message.css";
import {format} from "timeago.js";

const Message = ({message,user,own}) => {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1727&q=80" alt="avater" />
            <p>{message?.text}</p>
        </div>
        <span className="messageBottom">{format(message?.createdAt,'my-locale')}</span>
    </div>
  )
}

export default Message