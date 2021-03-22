import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DiscordIcon } from "../../images/icons/discord.svg";
import { ReactComponent as TwitterIcon } from "../../images/icons/twitter.svg";
import { ReactComponent as FacebookIcon } from "../../images/icons/facebook.svg";
import { ReactComponent as SteamIcon } from "../../images/icons/steam.svg";

function Footer() {
  return (
    <>
      <div className="sidebar-socials-wrapper">
        <DiscordIcon style={{ height: "35px", width: "35px", marginRight: "5px" }} /> {/*38h 33w */}
        <TwitterIcon style={{ height: "35px", width: "35px", marginRight: "5px" }} />
        <FacebookIcon style={{ height: "35px", width: "35px", marginRight: "5px" }} />
        <SteamIcon style={{ height: "35px", width: "35px", marginRight: "5px" }} />
      </div>

      <div className="sidebar-info-links">
        <div>
          <div>
            <a href="https://discord.gg/nqSgyCr" target="popup" id="removeDecoration" className="sb-button">
              Support
            </a>
          </div>
          <div>
            <Link to="/terms" id="removeDecoration" className="sb-button">
              Terms and conditions
            </Link>
          </div>
        </div>
        <div>
          <div>
            <Link to="/rules/trading" id="removeDecoration" className="sb-button">
              Trading rules
            </Link>
          </div>
          <div>
            <Link to="/rules/reputation" id="removeDecoration" className="sb-button">
              Reputation rules
            </Link>
          </div>
          <div>
            <Link to="/security" id="removeDecoration" className="sb-button">
              Prevent scam
            </Link>
          </div>
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
