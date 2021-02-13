import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { createNotification } from "../../misc/ToastNotification";
import Topbar from "../My Account/Topbar";
import Conversations from "./Conversations"
import Chat from "./Chat"
import useWindowDimensions from '../../misc/windowHW'
import { UserContext } from "../../context/UserContext";
import styles from "./Main.module.scss";
import testMessages from "./testMessages"

function Main({newMessage}) {
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])

  const { width } = useWindowDimensions()

  useEffect(() => {
    if (width > 1065)
      resetStyles()

  }, [width]);

  useEffect(() => {
    conversations.map(convo => {
      if (convo.isSelected)
        axios
        .get(`/api/messages/${convo.conversationWith._id}`)
        .then((res) => {
          //console.log(res.data.messages)
          setMessages(res.data.messages)
          //setMessages(testMessages)
        })
        .catch((err) => {
          console.log(err);
          createNotification(
            "error",
            "Oops, something went wrong",
            `oops something went wrong`
          );
        });
      })
    
  }, [conversations]);

  useEffect(() => { 
    axios
      .get(`/api/messages`)
      .then((res) => {
        let dialogues = res.data.dialogues

        for (let i = 0; i<dialogues.length; i++)
          if (i === 0)
            dialogues[i].isSelected = true
          else
            dialogues[i].isSelected = false

        setConversations(dialogues)
      })
      .catch((err) => {
        console.log(err);
        createNotification(
          "error",
          "Oops, something went wrong",
          `oops something went wrong`
        );
      });
  }, []);

  useEffect(() => { 
    if (newMessage){
      setMessages([...messages, newMessage])
    }
      
  }, [newMessage]);


  return (
    <>
      <Topbar />

      <div className={styles.accountWrapper}>

        <Conversations conversations={conversations} setConversations={setConversations}/>

        <Chat messages={messages} setMessages={setMessages} conversation={conversations.find(conv => conv.isSelected === true)}/>

      </div>
    </>
    );

  function resetStyles(){
    document.getElementById("account-sidebar").style.minWidth = ""
    document.getElementById("account-sidebar").style.maxWidth = "335px"
    document.getElementById("account-main").style.width = ""
    document.getElementById("account-main").style.marginLeft = ""
  }
}

export default Main;
