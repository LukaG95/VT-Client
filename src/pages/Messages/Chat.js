import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";

import styles from './Chat.module.scss'
import ChatComponent from './ChatComponent'
import useWindowDimensions from '../../misc/windowHW'
import { UserContext } from "../../context/UserContext";
import { createNotification } from "../../misc/ToastNotification";

function Chat({conversation, conversations, messages, setMessages, setConversations}) {
  const [chat, setChat] = useState("")
  const [view, setView] = useState()
  const [userStatus, setUserStatus] = useState()

  const { width } = useWindowDimensions()
  const { myID, username } = useContext(UserContext)

  useEffect(() => {
    if (width > 1065){
      setView("big")
    } else
      setView("small")

  }, [width]);

  useEffect(() => {
    chatbox.current.scrollTop = chatbox.current.scrollHeight
    console.log(chatbox.current.scrollHeight)

  }, [messages])

  useEffect(() => {
   
    if (conversation){
      axios
      .get(`/api/messages/${conversation.conversationWith._id}`)
      .then((res) => {
        setMessages(res.data.messages)
      })
      .catch((err) => {
        console.log(err);
      });

      getUserStatus()

      let checkingUserStatus = setInterval(()=> {
        getUserStatus()
      }, 15000)

      return () => clearTimeout(checkingUserStatus)
    }
      
    if (inputEl.current)
      inputEl.current.focus()

  }, [conversation]);

  const inputEl = useRef(null);
  const chatbox = useRef(null);

  // const allMessages = messages.length === 0 ? <Loader /> : messages.map(message => <ChatComponent message={message}/>)
  const allMessages = messages.map((message, i) => <ChatComponent message={message}/>)

  return (
    <div className={styles.chatWrapper} id="account-main">

      <div className={styles.header}>
        {view === "small" && <div className={styles.backArrow} onClick={()=> show1stPage()}>&#10140;</div>}
        {conversations.length > 0 && 

            <div className={[styles.status, userStatus === "online" ? styles.online : styles.offline].join(" ")}>
              <span className={styles.statusTooltip}>{userStatus && userStatus}</span>
            </div>
            
        }
        <p>{conversation && conversation.conversationWith.username}</p>
      </div>

      <div className={styles.chatBox} ref={chatbox}>
        {allMessages}
      </div>
      
      {
        conversations.length > 0 &&

        <form className={styles.form} onSubmit={e => {e.preventDefault(); submitChat(); /*setChat("")*/}}>
          <input 
            className={styles.chatInput}
            placeholder="Message"
            value={chat}
            onChange={e => {setChat(e.target.value)}}
            ref = {inputEl}
          />
        </form>
      
      }

    </div>
  );

  function submitChat(){
    // there's a confirmed: false here, which is only applied to new messages so we know not to check for that on those
    setMessages([...messages, {confirmed: false, sender: {_id: myID, username}, message: chat, createdAt: {timestamp: Date.now()}}]) 

    let tempChat = chat
    setChat("")

    axios
      .post('/api/messages/message', {recipientId: conversation.conversationWith._id, message: tempChat})
      .then(res => { 
        if(res.data.info === "success"){
          // confirm the message
          setMessages(state => {
            state[messages.length].confirmed = true;
            return state;
          })
        
          // move it to the top of the list, then update it's lastMessage and createdAt
          let updatedConvos = []
          let index = null
          conversations.forEach((convo, i)=> {
          if (convo === conversation){
            convo.lastMessage = tempChat
            convo.createdAt.timestamp = Date.now()
            index = i
          }
            updatedConvos.push(convo)
          })
          arraymove(updatedConvos, index, 0) // move to top 
          setConversations(updatedConvos)

        }                                                 
        
      })
      .catch(err => {
        if (err.response)
          if (err.response.status === 429)
            createNotification(
              "error",
              "You are sending too many messages, slow down",
              "1"
            )
      })
  }



  function show1stPage(){
    document.getElementById("account-sidebar").style.minWidth = "100%"
    document.getElementById("account-sidebar").style.maxWidth = "100%"
    document.getElementById("account-main").style.width = "0px"
    document.getElementById("account-main").style.marginLeft = "0px"
  }

  function cleanTime(){

    var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes()

    return (h + ':' + m)
    
  }

  function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);  
  }

  function getUserStatus(){
    axios
      .get(`/api/messages/status/${conversation.conversationWith._id}`)
      .then((res) => {
        if (res.data.info === "success")
          setUserStatus(res.data.status)
      })
      .catch((err) => {
        console.log(err);
      });
  }

}

export default Chat;
