import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'

function Sidebar() {
  return (
      <div>
        <Link to="/prices"><a>Prices</a></Link>
      </div>
  )
}

export default Sidebar;
