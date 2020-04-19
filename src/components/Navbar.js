import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navWrapper">     {/*RED*/}

      <div className="navLeft">     {/*BLUE*/}

        <Link to="/trading">
          <div className="navLeftItem">
            <div>Home</div>
          </div>
        </Link>

        <Link to="/trading">
          <div className="navLeftItem">
            <div></div>
            <div>Trading</div>
          </div>
        </Link>

        <Link to="/prices">
          <div className="navLeftItem">
            <div></div>
            <div>Prices</div>
          </div>
        </Link>

        <Link to="/reputation">
          <div className="navLeftItem">
            <div></div>
            <div>Reputation</div>
          </div>
        </Link>

        <Link to="/premium">
          <div className="navLeftItem">
            <div></div>
            <div>Premium</div>
          </div>
        </Link>

      </div>                         {/*END BLUE*/}


      <div className="navRight">     {/*BLUE*/}

        <div className="navRightItem">
          <div className="navRightContent">Add Trade</div>
          <div className="navRightContent">Notifications</div>
        </div>

        <div className="navRightItem">
          <div>Profile</div>
        </div>

      </div>                         {/*END BLUE*/}


    </nav>
  )
}


export default Navbar;
