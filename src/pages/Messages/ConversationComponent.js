import React, { useState, useEffect } from "react";

import styles from './ConversationComponent.module.scss'
import useWindowDimensions from '../../misc/windowHW'
import {formatedMessagesTime} from "../../misc/time"

function ConversationComponent({conversation, conversations, setConversations, setPageNumber}) {
  const [view, setView] = useState()
  const [lastMessage, setLastMessage] = useState()
  const [lastDate, setLastDate] = useState()

  useEffect(()=> {
    setLastMessage(conversation.lastMessage)
    setLastDate(formatedMessagesTime(conversation.createdAt.timestamp))
    
  }, [conversations])

  const { width } = useWindowDimensions()

  useEffect(() => {
    if (width > 1065){
      setView("big")
    } else
      setView("small")

  }, [width]);

  return (
      <div 
        className={[styles.convComponent, conversation.isSelected && view === "big" ? styles.selected : null].join(" ")}
        onClick={()=> {
          let x = []
          conversations.forEach(conv => {
            if (conv === conversation){ 
              if (conv.isSelected === false)
                setPageNumber(1)
              
              conv.isSelected = true
            }
            else 
              conv.isSelected = false
            
            x.push(conv)
          })
          setConversations(x)
          if (view === "small") show2ndPage()
        }}
      > 
        <div className={styles.flex}>
          {conversation.conversationWith.username} 
          <p>{lastDate}</p>
        </div>

        <p className={styles.lastMessage}>{lastMessage}</p>
        
      </div>
    );

    function show2ndPage(){
      document.getElementById("account-sidebar").style.minWidth = "0px"
      document.getElementById("account-sidebar").style.maxWidth = "0px"
      document.getElementById("account-main").style.width = "100%"
      document.getElementById("account-main").style.marginLeft = "0px"
    }

}

export default ConversationComponent;