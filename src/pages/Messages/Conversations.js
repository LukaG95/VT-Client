import React, { useMemo } from "react";

import ConversationComponent from "./ConversationComponent"
import styles from "./Conversations.module.scss";

function Conversations({conversations, setConversations, setPageNumber}) {

  const allConversations = useMemo(
    () => 
      conversations.map(conversation => (
        <ConversationComponent conversation={conversation} conversations={conversations} setConversations={setConversations} setPageNumber={setPageNumber}/>
      )),
    [conversations]
  );
  

  return (

      <div className={styles.conversationsWrapper} id="account-sidebar">
        
        {allConversations}

      </div>
      

    );

}

export default Conversations;
