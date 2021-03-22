import React from "react";
import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";
import { ReactComponent as LogoIcon } from "../images/logo/vt-red.svg"; 
import { ReactComponent as DiscordIcon } from "../images/icons/discord.svg";
import { ReactComponent as TwitterIcon } from "../images/icons/twitter.svg";
import { ReactComponent as FacebookIcon } from "../images/icons/facebook.svg";
import { ReactComponent as SteamIcon } from "../images/icons/steam.svg";

function Footer() {
  return (
    <div className={styles.footer}> 
      <div className={styles.hr}></div>
      
      <div className={styles.footerBody}>
        
        <div className={styles.footerLogoWrapper}>
          <LogoIcon style={{ width: "150px", height: "50px"}} />
          <p>Copyright © 2020 Virtrade,<br /> Inc. All rights reserved <br /><br /><span><a href="mailto:info@virtrade.gg">info@virtrade.gg</a></span></p>
        </div>

        <div className={styles.footerInfoSection} style={{marginLeft: "200px"}}>
          <h4>CUSTOMER INFORMATION</h4>
          <a href="https://discord.gg/nqSgyCr" target="popup">Support</a>
          <Link to="/terms">Terms and conditions</Link>
        </div>

        <div className={styles.footerInfoSection} style={{marginLeft: "100px"}}>
          <h4>GUIDELINES</h4>
          <Link to="/rules/trading">Trading rules</Link>
          <Link to="/rules/reputation">Reputation rules</Link>
          <Link to="/security">Prevent scam</Link>
        </div>

        <div className={styles.footerSocials}>
          <h4>Follow us</h4>
          <div>
            <DiscordIcon className={styles.social}/>
            <TwitterIcon className={styles.social} />
            <FacebookIcon className={styles.social} />
            <SteamIcon className={styles.social} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Footer;
