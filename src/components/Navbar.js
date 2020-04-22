import React from 'react'
import {Link} from 'react-router-dom'

import {ReactComponent as Logo} from '../images/logo/logo.svg'
import {ReactComponent as TradingWhite} from '../images/other/tradingWhite.svg'
import {ReactComponent as ReputationWhite} from '../images/other/reputationWhite.svg'
import {ReactComponent as PricesWhite} from '../images/other/pricesWhite.svg'
import {ReactComponent as CrownIcon} from '../images/other/crown.svg'

function Navbar() {
  return (
    <nav className="navWrapper">     {/*RED*/}

      <div className="navLeft">     {/*BLUE*/}

        <Link to="/trading/rl">
          <div className="navLeftItem">
            <Logo style={{height: "40px", width: "40px"}} />
          </div>
        </Link>

        <Link to="/trading/rl" id="removeDecoration">
          <div className="navLeftItem">
            <TradingWhite style={{height: "15px", width: "15px"}} className="navLeftContent" />
            <div className="navLeftContent">Trading</div>
          </div>
        </Link>

        <Link to="/prices" id="removeDecoration">
          <div className="navLeftItem">
            <PricesWhite style={{height: "15px", width: "15px"}} className="navLeftContent" />
            <div className="navLeftContent">Prices</div>
          </div>
        </Link>

        <Link to="/reputation" id="removeDecoration">
          <div className="navLeftItem">
            <ReputationWhite style={{height: "15px", width: "15px"}} className="navLeftContent" />
            <div className="navLeftContent">Reputation</div>
          </div>
        </Link>

        <Link to="/premium" id="removeDecoration">
          <div className="navLeftItem">
            <CrownIcon style={{height: "15px", width: "15px"}} className="navLeftContent" />
            <div className="navLeftContent">Premium</div>
          </div>
        </Link>

      </div>                         {/*END BLUE*/}


      <div className="navRight">     {/*BLUE*/}

        <div className="navRightItem">
          <div className="navRightContent">Add Trade</div>
          <div className="navRightContent">Notifications</div>
        </div>

        <div className="navRightItem">
          <div className="navRightContent">Profile</div>
        </div>

      </div>                         {/*END BLUE*/}


    </nav>
  )
}


export default Navbar;
