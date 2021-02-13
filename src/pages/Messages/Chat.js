import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import styles from './Chat.module.scss'
import ChatComponent from './ChatComponent'
import useWindowDimensions from '../../misc/windowHW'

function Chat({conversation, messages, setMessages}) {
  const [chat, setChat] = useState("")
  const [view, setView] = useState()

  const { width } = useWindowDimensions()

  useEffect(() => {
    if (width > 1065){
      setView("big")
    } else
      setView("small")

  }, [width]);

  useEffect(() => {
    updateScroll()
  }, [messages])

  const allMessages = messages.map(message => <ChatComponent message={message}/>)
 
  return (
    <div className={styles.chatWrapper} id="account-main">

      <div className={styles.header}>
        {view === "small" && <div className={styles.backArrow} onClick={()=> show1stPage()}>&#10140;</div>}
        <div className={styles.status}></div>
        <p>{conversation && conversation.conversationWith.username}</p>
      </div>

      <div className={styles.chatBox} id="test">
        {allMessages}
      </div>
      
      <form className={styles.form} onSubmit={e => {e.preventDefault(); submitChat(); /*setChat("")*/}}>
        <input 
          className={styles.chatInput}
          placeholder="Message"
          value={chat}
          onChange={e => {setChat(e.target.value)}}
        />
      </form>

    </div>
  );

  function submitChat(){
    setMessages([...messages, {recipientId: "4u8545", message: chat}])
    let tempChat = chat
    setChat("")
    axios
      .post('/api/messages/message', {recipientId: conversation.conversationWith._id, message: tempChat})
      .then(res => {setChat("")})
      .catch(err => console.log(err.response))
  }

  function updateScroll(){
    var element = document.getElementById("test");
    element.scrollTop = element.scrollHeight;
  }

  function show1stPage(){
    document.getElementById("account-sidebar").style.minWidth = "100%"
    document.getElementById("account-sidebar").style.maxWidth = "100%"
    document.getElementById("account-main").style.width = "0px"
    document.getElementById("account-main").style.marginLeft = "0px"
  }


}

export default Chat;
