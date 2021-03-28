import React, { useContext } from "react";

import styles from "./Platforms.module.scss"
import { loginPlatforms } from "../../constants/platforms"
import PlatformField from "./PlatformField"
import { UserContext } from "../../context/UserContext";

function Platforms(view) {
  const { user, getUserInfo } = useContext(UserContext);

  return (
    <div className={styles.platformsWrapper}>
      {view === "small" && <div className="backArrow" style={{margin: "20px 0px 0px 20px"}} onClick={()=> show1stPage()}>&#10140;</div>}
      <div className={styles.platforms}>
        
        {Object.keys(loginPlatforms).map(name =>
          <PlatformField 
            name={name}
            linkedPlatform={user[name.toLowerCase()]}
            getUserInfo={getUserInfo}
          />
        )}
      </div>
    </div>
  );

  function show1stPage(){
    document.getElementById("account-sidebar").style.minWidth = "100%"
    document.getElementById("account-sidebar").style.maxWidth = "100%"
    document.getElementById("account-main").style.width = "0px"
    document.getElementById("account-main").style.marginLeft = "0px"
  }
}

export default Platforms;
