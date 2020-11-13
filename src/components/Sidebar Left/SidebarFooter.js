import React from 'react'
import {Link} from 'react-router-dom'

function SidebarFooter(){

  return(
    <>
      <div className="sidebar-socials-wrapper">
        <img height={38} width={33} src={require('../../images/other/Discord logo FULL.png')} />
        <img height={35} width={42} src={require('../../images/other/TwitterLogo.png')} />
        <img height={35} width={35} src={require('../../images/other/InstagramLogo.png')} />
        <img height={35} width={35} src={require('../../images/other/Steam icon.png')} />
      </div>

      <div className="sidebar-info-links">
        <div>
          <div><Link to="/a" id="removeDecoration" className="sb-button">About us</Link></div>
          <div><Link to="/b" id="removeDecoration" className="sb-button">Privacy policy</Link></div>
          <div><Link to="/c" id="removeDecoration" className="sb-button">Terms of service</Link></div>
        </div>
        <div>
          <div><Link to="/d" id="removeDecoration" className="sb-button">FAQ</Link></div>
          <div><Link to="/e" id="removeDecoration" className="sb-button">Trading rules</Link></div>
          <div><Link to="/f" id="removeDecoration" className="sb-button">Reputation rules</Link></div>
          <div><Link to="/g" id="removeDecoration" className="sb-button">Prevent scam</Link></div>
        </div>
      </div>

      <div className="sidebar-copyright-wrapper">
        <p>Copyright &#169; 2020 Virtrade,<br />Inc. All rights reserved</p>
        <p className="sidebar-email">info@virtrade.com</p>
      </div>
    </>
  )
}

export default SidebarFooter