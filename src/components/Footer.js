import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <div className="sbSection footer">

      <ul className="sbItem footerFirst">
        <li><a href="https://discord.gg/Qt6qKJx">Giveaway</a></li>
        <li><a href="https://discord.gg/nqSgyCr">Support</a></li>
        <li><Link to="/terms">Terms of service</Link></li>
      </ul>

      <ul className="sbItem footerSecond">
        <li><Link to="/privacy">Privacy policy</Link></li>
        <li><Link to="/contactus">Contact us</Link></li>
      </ul>

      <p className="sbItem footerThird">
        © <b>VirTrade - All rights reserved</b>
      </p>

    </div>
  )
}

export default Footer;
