import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import axios from "axios";

import styles from './Chat.module.scss'
import ChatComponent from './ChatComponent'
import useWindowDimensions from '../../misc/windowHW'
import { UserContext } from "../../context/UserContext";
import { createNotification } from "../../misc/ToastNotification";
import useChatSearch from "./useChatSearch";

function Chat({conversation, conversations, messages, setMessages, setConversations, newMessage, pageNumber, setPageNumber}) {
  const [chat, setChat] = useState("")
  const [view, setView] = useState()
  const [userStatus, setUserStatus] = useState("offline")
  const [blocked, setBlocked] = useState()
  const [weSentMessage, setWeSentMessage] = useState(false)
  const [weReceivedMessage, setWeReceivedMessage] = useState(false)
  const [weFetchedMessages, setWeFetchedMessages] = useState(false)

  const { width } = useWindowDimensions()
  const { myID, username } = useContext(UserContext)

  const inputEl = useRef(null);
  const chatbox = useRef(null);

  useEffect(() => {
    if (width > 1065){
      setView("big")
    } else
      setView("small")

  }, [width]);

  useEffect(() => {
    if(newMessage)
      setWeReceivedMessage(true)
  }, [newMessage])

  // custom hook to tell us if we're currently loading and if more messages can be fetched
  let userId = null
  if (conversation) userId = conversation.conversationWith._id
  const {loading, hasMore} = useChatSearch(userId, pageNumber, setMessages, setWeFetchedMessages)


  // scroll the container when messages state changes
  useEffect(() => {
    
    if (weSentMessage){
      chatbox.current.scrollTop = chatbox.current.scrollHeight
      setWeSentMessage(false)
    }
    else if (weReceivedMessage){
      chatbox.current.scrollTop = chatbox.current.scrollHeight
      setWeReceivedMessage(false)
    }
    else if (weFetchedMessages){
      chatbox.current.scrollTop = chatbox.current.scrollHeight / 5
      setWeFetchedMessages(false)
    }
    else 
      chatbox.current.scrollTop = chatbox.current.scrollHeight

  }, [messages])

  // if hasMore has changed it means we made a request and we need to scroll appropriately

  useEffect(() => {
    if (conversation){
      getUserBlockStatus()
      setUserStatus("offline")
      getUserStatus()
      var checkingUserStatus = setInterval(()=> {
        getUserStatus()
      }, 15000)
    }
      
    if (inputEl.current && view === "big")
      inputEl.current.focus()

    return () => clearTimeout(checkingUserStatus)
    
  }, [conversation]);


  const observer = useRef()
  const lastMessageElement = useCallback(node => { 
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) { 
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading]) // hasMore

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
        { 
          blocked ? 
            <button 
              className={styles.blockButton}
              onClick={()=> { 
                axios
                  .delete("/api/messages/blockUser", {data: {
                    recipientId: conversation.conversationWith._id
                  }})
                  .then((res) => { console.log(res.data)
                    if (res.data.info === "success"){
                      setBlocked(false)
                      createNotification(
                        "success",
                        `User unblocked`,
                        `unblocked ${conversation.conversationWith._id}`
                      )
                    }
                  })
                  .catch((err) => {
                    console.log(err.response);
                  });
              }} >Unblock
            </button> 
          : 
            blocked === false ? 
            <button 
              className={styles.blockButton}
              onClick={()=> { 
                axios
                  .post("/api/messages/blockUser", { 
                    recipientId: conversation.conversationWith._id
                  })
                  .then((res) => { 
                    if (res.data.info === "success"){
                      setBlocked(true)
                      createNotification(
                        "success",
                        `User blocked`,
                        `blocked ${conversation.conversationWith._id}`
                      )
                    }
                  })
                  .catch((err) => {
                    console.log(err.response);
                  });
              }}>Block
            </button> 
          : 
            null
        }
      </div>

      <div className={styles.chatBox} ref={chatbox}>
        <div className={styles.loading}>{(loading && conversation) && 'Loading...'}</div>
        {messages.map((message, i) => {
          if (i===0){
            // console.log(message, i)
            return <ChatComponent lastMessageElement={lastMessageElement} message={message}/>
          }
          else
            return <ChatComponent message={message}/>
        })}
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
            type="text" 
            maxLength="500"
          />
        </form>
      
      }

    </div>
  );

  function submitChat(){
    if (!validateMessage()) return

    setWeSentMessage(true)

    // there's a confirmed: false here, which is only applied to new messages so we know to check for that only on those
    setMessages(prev => {
      let avatar = false
      if (messages.length === 0) // if it's the very 1st message
        avatar = true
      else if (Date.now() - prev[prev.length-1].createdAt.timestamp > 300000) // if last message is 5 minutes or older
        avatar = true
      else if (myID !== prev[prev.length-1].sender._id) // if the last message was not sent my me
        avatar = true
      return [...messages, {displayAvatar: avatar, confirmed: false, sender: {_id: myID, username}, message: chat, createdAt: {timestamp: Date.now()}}]
    }) 

    let tempChat = chat
    setChat("")

    axios
      .post('/api/messages/message', {recipientId: conversation.conversationWith._id, message: tempChat})
      .then(res => { 
        if(res.data.info === "success"){
          // confirm the message
          setMessages(prev => {
            prev[messages.length].confirmed = true;
            return prev;
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
      .catch(err => { console.log(err.response)
        if (err.response)
          if (err.response.status === 429)
            createNotification(
              "error",
              "You are sending too many messages, slow down",
              "1"
            )
      })
  }

function validateMessage(){
  if (chat === undefined || chat.replace(/\s/g, "").length < 1 || chat.length > 500)
    return false
  else 
    return true
}

  function show1stPage(){
    document.getElementById("account-sidebar").style.minWidth = "100%"
    document.getElementById("account-sidebar").style.maxWidth = "100%"
    document.getElementById("account-main").style.width = "0px"
    document.getElementById("account-main").style.marginLeft = "0px"
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

  function getUserBlockStatus(){
    axios
      .get(`/api/messages/status/blocked/${conversation.conversationWith._id}`)
      .then((res) => { 
        if (res.data.status === "Blocked")
          setBlocked(true)
        else
          setBlocked(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }

}

export default Chat;
