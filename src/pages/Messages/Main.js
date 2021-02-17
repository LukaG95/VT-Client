import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { createNotification } from "../../misc/ToastNotification";
import Topbar from "../My Account/Topbar";
import Conversations from "./Conversations"
import Chat from "./Chat"
import useWindowDimensions from '../../misc/windowHW'
import styles from "./Main.module.scss";

function Main({newMessage}) {
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])

  const { width } = useWindowDimensions()

  useEffect(() => {
    if (width > 1065)
      resetStyles()

  }, [width]);

  // 1. Get conversations on first visit and set isSelected to the 1st one
  useEffect(() => { 
    axios
      .get(`/api/messages`)
      .then((res) => {
        let dialogues = res.data.dialogues
        if (dialogues.length > 0)
          dialogues[0].isSelected = true
        setConversations(dialogues)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 2. On newMessage 
  useEffect(() => {                                            
    if (newMessage){
      const found = conversations.findIndex(convo => convo.conversationWith._id === newMessage.sender._id) // find the conversation newMessage belongs to

      if (found !== -1){ // if it's found move it to the top of the list, then update it's lastMessage and createdAt
        let updatedConvos = []
        conversations.forEach((convo, i)=> {
          if (i === found){
            convo.lastMessage = newMessage.message
            convo.createdAt = newMessage.createdAt

            if(convo.isSelected)
              setMessages([...messages, newMessage])
          }
            updatedConvos.push(convo)
        })
        arraymove(updatedConvos, found, 0) // move to top 
        setConversations(updatedConvos) 
      }
      else { // if it's not found create a new conversation
        let newConversation = {
          createdAt:  newMessage.createdAt,
          lastMessage: newMessage.message,
          conversationWith: {
            _id: newMessage.sender._id,
            username: newMessage.sender.username
          },
          isSelected: conversations.length === 0
        }
        setConversations([newConversation, ...conversations])
      }  
    }
    
  }, [newMessage]);


  return (
    <>
      <Topbar />
      
      <div className={styles.accountWrapper}>

        <Conversations 
          conversations={conversations} 
          setConversations={setConversations}
        />

        <Chat 
          messages={messages} 
          setMessages={setMessages} 
          setConversations={setConversations}
          conversation={conversations.find(conv => conv.isSelected === true)}
          conversations={conversations}
        />

      </div> 
    </>
    );
    

  function resetStyles(){
    try{
    document.getElementById("account-sidebar").style.minWidth = ""
    document.getElementById("account-sidebar").style.maxWidth = "335px"
    document.getElementById("account-main").style.width = ""
    document.getElementById("account-main").style.marginLeft = ""
    } catch {}
  }

  function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);  
  }

}

export default Main;
