import React, {useContext} from "react";
import { Link } from "react-router-dom";

import { ReactComponent as DiscordIcon } from "../../images/icons/discord.svg";
import { ReactComponent as TwitterIcon } from "../../images/icons/twitter.svg";
import { ReactComponent as FacebookIcon } from "../../images/icons/facebook.svg";
import { ReactComponent as SteamIcon } from "../../images/icons/steam.svg";
import { closeSidebar } from "../../misc/manageSidebar";
import { LeftSidebarContext } from "../../context/LeftSidebar";

function Footer() {

  const { setIsOpen_LeftSidebar } = useContext(
    LeftSidebarContext
  );

  return (
    <>
      <div className="sidebar-socials-wrapper">
        <DiscordIcon onClick={()=> window.open("https://discord.gg/Qt6qKJx")} className="social" /> {/*38h 33w */}
        <TwitterIcon onClick={()=> window.open("https://twitter.com/VirtradeGG")} className="social" />
        <FacebookIcon onClick={()=> window.open("https://www.facebook.com/Virtrade/")} className="social" />
        <SteamIcon onClick={()=> window.open("https://steamcommunity.com/groups/virtrade")} className="social" />
      </div>

      <div className="sidebar-info-links">
        <div>

          <a href="https://discord.gg/nqSgyCr" target="popup" id="removeDecoration" className="sb-button">
            Support
          </a>

          <Link to="/terms" id="removeDecoration" className="sb-button">
            <div onClick={()=> {closeSidebar(); setIsOpen_LeftSidebar(false)}}>Terms and conditions</div>
          </Link>
         
        </div>
        <div>
          
          <Link to="/rules/trading" id="removeDecoration" className="sb-button">
            <div onClick={()=> {closeSidebar(); setIsOpen_LeftSidebar(false)}}>Trading rules</div>
          </Link>
        
          <Link to="/rules/reputation" id="removeDecoration" className="sb-button">
            <div onClick={()=> {closeSidebar(); setIsOpen_LeftSidebar(false)}}>Reputation rules</div>
          </Link>
        
          <Link to="/security" id="removeDecoration" className="sb-button">
            <div onClick={()=> {closeSidebar(); setIsOpen_LeftSidebar(false)}}>Prevent scam</div>
          </Link>
         
        </div>
      </div>

      <div className="sidebar-copyright-wrapper">
        <p>
          Copyright © 2020 Virtrade,<br /> Inc. All rights reserved 
          <br /><br />
          <span><a href="mailto:info@virtrade.gg">info@virtrade.gg</a></span>
          <br /><br /><br />
        </p>
      </div>
    </>
  );
}

export default Footer;
