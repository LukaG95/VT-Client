import React, { useEffect, useContext } from "react";

import styles from './ChatComponent.module.scss'
import { UserContext } from "../../context/UserContext";

function ChatComponent({message}) {

  const { myID } = useContext(UserContext);

  useEffect(() => {

  }, []);

 
  return (
    <div>
      {message.displayAvatar ? 
        <div className={styles.avatarWrapper}>
          <div className={[styles.avatar, message.userId === myID && styles.myChatColor].join(" ")}></div>
          <p className={styles.username}>{message.username}<pre>{message.createdAt}</pre></p>
        </div> 
      : 
        null}

      <div className={[styles.chatText, message.userId === myID && styles.myChatColor].join(" ")}>{message.message}</div>
    </div>
  );

}

export default ChatComponent;
