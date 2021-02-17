import React, { useEffect, useContext } from "react";

import styles from './ChatComponent.module.scss'
import { UserContext } from "../../context/UserContext";

function ChatComponent({message, confirmed}) {

  const { myID } = useContext(UserContext);

  useEffect(() => {

  }, []);


 if (message)
  return (
    <div>
      {!message.displayAvatar ? 
        <div className={styles.avatarWrapper}>
          <div className={[styles.avatar, message.sender._id === myID && styles.myChatColor].join(" ")}></div>
          <p className={styles.username}>{message.sender.username}<pre>{message.createdAt}</pre></p>
        </div> 
      : 
        null}

      <div className={[styles.chatText, message.sender._id === myID && styles.myChatColor, message.confirmed === false && confirmed === false ? styles.unconfirmed : null].join(" ")}>{message.message}</div>
    </div>
  );
  else return null

}

export default ChatComponent;
