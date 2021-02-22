import React, { useEffect, useContext } from "react";

import styles from './ChatComponent.module.scss'
import { UserContext } from "../../context/UserContext";
import {formatedMessagesTime} from "../../misc/time"

function ChatComponent({message}) {

  const { myID } = useContext(UserContext);

  useEffect(() => {

  }, []);


 if (message)
  return (
    <div>
      {!message.displayAvatar ? 
        <div className={styles.avatarWrapper}>
          <div className={[styles.avatar, message.sender._id === myID && styles.myChatColor].join(" ")}></div>
          <p className={styles.username}>{message.sender.username}<pre>{formatedMessagesTime(message.createdAt.timestamp)}</pre></p>
        </div> 
      : 
        null}

      <div className={[styles.chatText, message.sender._id === myID && styles.myChatColor, message.confirmed === false ? styles.unconfirmed : null].join(" ")}>{message.message}</div>
    </div>
  );
  else return null

}

export default ChatComponent;
