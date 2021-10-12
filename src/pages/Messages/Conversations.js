import React, { useMemo } from "react";

import ConversationComponent from "./ConversationComponent"
import styles from "./Conversations.module.scss";

function Conversations({conversations, setConversations, setPageNumber, conversationsSet}) {

  const allConversations = useMemo(
    () => 
      conversations.map(conversation => (
        <ConversationComponent conversation={conversation} conversations={conversations} setConversations={setConversations} setPageNumber={setPageNumber}/>
      )),
    [conversations]
  );
  
  return (

      <div className={styles.conversationsWrapper} id="account-sidebar" style={allConversations.length === 0 ? {justifyContent: "center"} : {}}>
        
        {!conversationsSet ? null : allConversations.length === 0 ? <p className={styles.noMessages}>No Messages</p> : allConversations}

      </div>
      

    );

}

export default Conversations;
