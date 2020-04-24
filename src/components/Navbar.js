import React from 'react'
import {Link, useLocation} from 'react-router-dom'

import {ReactComponent as Logo} from '../images/logo/logo.svg'
import {ReactComponent as TradingWhite} from '../images/other/tradingWhite.svg'
import {ReactComponent as ReputationWhite} from '../images/other/reputationWhite.svg'
import {ReactComponent as PricesWhite} from '../images/other/pricesWhite.svg'
import {ReactComponent as CrownIcon} from '../images/other/crown.svg'
import {ReactComponent as BellIcon} from '../images/other/bellWhite.svg'
import {ReactComponent as ProfileIcon} from '../images/other/profile.svg'

function Navbar() {
  let location = useLocation()
  let trading = "", prices = "", reputation ="", premium = ""

  switch(location.pathname) {
  case "/trading/rl":
      trading = "currentPage"
    break;
  case "/prices":
      prices = "currentPage"
    break;
  case "/reputation":
      reputation = "currentPage"
    break;
  case "/premium":
      premium = "currentPage"
  break;
  default:
} 

  return (
    <nav className="navWrapper">     {/*RED*/}

      <div className="navLeft">     {/*BLUE*/}

          <div className="navLeftItem" id="logo">
            <Link id="center" to="/trading/rl"> <Logo style={{height: "50px", width: "50px"}} /></Link>
          </div>
        

        <Link to="/trading/rl" id="removeDecoration">
          <div className={`navLeftItem ${trading}`}>
            <TradingWhite style={{height: "15px", width: "15px"}} className="navLeftContent"/>
            <div className="navLeftContent">Trading</div>
          </div>
        </Link>

        <Link to="/prices" id="removeDecoration">
          <div className={`navLeftItem ${prices}`}>
            <PricesWhite style={{height: "15px", width: "15px"}} className="navLeftContent" />
            <div className="navLeftContent">Prices</div>
          </div>
        </Link>

        <Link to="/reputation" id="removeDecoration">
          <div className={`navLeftItem ${reputation}`}>
            <ReputationWhite style={{height: "15px", width: "15px"}} className="navLeftContent" />
            <div className="navLeftContent">Reputation</div>
          </div>
        </Link>

        <Link to="/premium" id="removeDecoration">
          <div className={`navLeftItem ${premium}`}>
            <CrownIcon style={{height: "15px", width: "15px"}} className="navLeftContent" />
            <div className="navLeftContent">Premium</div>
          </div>
        </Link>

      </div>                         {/*END BLUE*/}


      <div className="navRight">     {/*BLUE*/}

        <div className="navRightItem tradeBellSection">
          <div className="navRightContent addTrade">+ New trade</div>
          <BellIcon style={{height: "30px", width: "30px"}} className="navRightContent bell" />
        </div>

        <div className="navRightItem profile">
          <ProfileIcon style={{height: "50px", width: "50px"}} className="navRightContent" />
        </div>

      </div>                         {/*END BLUE*/}


    </nav>
  )
}


export default Navbar;
