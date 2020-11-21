import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="sidebar-socials-wrapper">
        <img
          height={38}
          width={33}
          src="/images/icons/discord-full.png"
          alt=""
        />
        <img
          height={35}
          width={42}
          src="/images/icons/twitter.png"
          alt=""
        />
        <img
          height={35}
          width={35}
          src="/images/icons/instagram.png"
          alt=""
        />
        <img
          height={35}
          width={35}
          src="/images/icons/steam.png"
          alt=""
        />
      </div>

      <div className="sidebar-info-links">
        <div>
          <div>
            <Link to="/a" id="removeDecoration" className="sb-button">
              About us
            </Link>
          </div>
          <div>
            <Link to="/b" id="removeDecoration" className="sb-button">
              Privacy policy
            </Link>
          </div>
          <div>
            <Link to="/c" id="removeDecoration" className="sb-button">
              Terms of service
            </Link>
          </div>
        </div>
        <div>
          <div>
            <Link to="/d" id="removeDecoration" className="sb-button">
              FAQ
            </Link>
          </div>
          <div>
            <Link to="/e" id="removeDecoration" className="sb-button">
              Trading rules
            </Link>
          </div>
          <div>
            <Link to="/f" id="removeDecoration" className="sb-button">
              Reputation rules
            </Link>
          </div>
          <div>
            <Link to="/g" id="removeDecoration" className="sb-button">
              Prevent scam
            </Link>
          </div>
        </div>
      </div>

      <div className="sidebar-copyright-wrapper">
        <p>
          Copyright &#169; 2020 Virtrade,
          <br />
          Inc. All rights reserved
        </p>
        <p className="sidebar-email">info@virtrade.com</p>
      </div>
    </>
  );
}

export default Footer;
