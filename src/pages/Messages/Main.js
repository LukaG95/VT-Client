import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

import Topbar from "../My Account/Topbar";
import Conversations from "./Conversations"
import Chat from "./Chat"
import useWindowDimensions from '../../misc/windowHW'
import styles from "./Main.module.scss";
import { UserContext } from "../../context/UserContext";
import {Helmet} from "react-helmet";

function Main({newMessage}) {
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [conversationsSet, setConversationsSet] = useState(false)
  const [view, setView] = useState()

  const { width } = useWindowDimensions()
  const { myID } = useContext(UserContext);
  const { pathID } = useParams()
 
  useEffect(() => {
    if (width > 1065){
      setView("big")
      if (view === "small")
        resetStyles()
    } else
      setView("small")
        
  }, [width]);

  // 1. Get conversations on first visit and set isSelected to the 1st one
  useEffect(() => { 
    axios
      .get(`/api/messages`)
      .then((res) => {
        let dialogues = res.data.dialogues.map(convo => {convo.isSelected = false; return convo})
        if (dialogues.length > 0)
          dialogues[0].isSelected = true
        setConversations(dialogues)
        setConversationsSet(true)
      })
      .catch((err) => {});
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
              setMessages(prev=> {
                newMessage.displayAvatar = false
                if (prev.length === 0) // if it's the very 1st message
                  newMessage.displayAvatar = true
                else if (Date.now() - prev[prev.length-1].createdAt.timestamp > 300000) // if last message is 5 minutes or older
                  newMessage.displayAvatar = true
                else if (newMessage.sender._id !== prev[prev.length-1].sender._id) // if the last message was not sent my the same user (can replace prev[prev.length-1].sender._id with MyID)
                  newMessage.displayAvatar = true
                          
                return [...prev, newMessage]
              })

          }
            updatedConvos.push(convo)
        })
        arraymove(updatedConvos, found, 0) // move to top 
        setConversations(updatedConvos) 
      }
      else { // if it's not found create a new conversation 
        let newConversation = {
          createdAt: newMessage.createdAt,
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

  // open a conversation through URL
  useEffect(() => {
    if(conversationsSet && pathID && (pathID !== myID)){
      const found = conversations.findIndex(convo => convo.conversationWith._id === pathID) // check if the conversation already exists
      
      if (found !== -1){ // if it's found move it to the top of the list and select it
        if (view === "small") show2ndPage()
        let updatedConvos = []
        conversations.forEach((convo, i)=> {
          if (i === found)
            convo.isSelected = true
          else
            convo.isSelected = false

          updatedConvos.push(convo)
        })
        arraymove(updatedConvos, found, 0) // move to top 
        setConversations(updatedConvos) 
      }
      else { // fetch if the user exists and open a new conversation 
        axios
          .get(`/api/auth/getUserById/${pathID}`)
          .then((res) => { 
            if (res.status !==200 ) return null
            else {
              let newConversation = {
                createdAt: {timestamp: null},
                lastMessage: null,
                conversationWith: {
                  _id: pathID,
                  username: res.data.username
                },
                isSelected: true
              }
              setConversations(prev=> {
                let updatedConvos = prev.map(convo => {convo.isSelected = false; return convo})
                return [newConversation, ...updatedConvos]
              })
              if (view === "small") show2ndPage()

            }
          })
          .catch((err) => {});
      }  
    }
  }, [conversationsSet, pathID])


  return (
    <>
      <Helmet>
        <title>Messages | VirTrade</title>
        <description>Messages page contains you conversations and messages. Chat and talk to other players about their trades</description>
        <link rel="canonical" href="http://virtrade.gg/account/messages" />
      </Helmet>

      <Topbar />
      
      <div className={styles.accountWrapper}>

        <Conversations 
          conversations={conversations} 
          setConversations={setConversations}
          setPageNumber={setPageNumber}
        />

        <Chat 
          messages={messages} 
          setMessages={setMessages} 
          setConversations={setConversations}
          conversation={conversations.find(conv => conv.isSelected === true)}
          conversations={conversations}
          newMessage={newMessage}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
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

  function show2ndPage(){
    document.getElementById("account-sidebar").style.minWidth = "0px"
    document.getElementById("account-sidebar").style.maxWidth = "0px"
    document.getElementById("account-main").style.width = "100%"
    document.getElementById("account-main").style.marginLeft = "0px"
  }
}

export default Main;
