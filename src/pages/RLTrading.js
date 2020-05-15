import React, {useState, useContext} from 'react'
import Sidebar from '../components/Sidebar'
import {FiltersRLContext} from '../components/FiltersRL_Context'

function RLTrading() {
  const [] = useState()

  const {game, searchType, name, paint, cert, itemType, platform} = useContext(FiltersRLContext)

  return (
    <div className="secondaryWrapper">  

      <Sidebar />
      
      <main className="main">

        <div className="main-top">
          <p className="trading-title">Rocket League</p> 
          <div></div>     {/* placeholder */}
          <div></div>     {/* placeholder */}
        </div>
        <section className="page-numbers"></section>

        <div className="main-middle"></div>
        <section className="page-numbers"></section>

      </main>

    </div>
  )
}

export default RLTrading;


 /* 
 1. useEffect will listen on change on state coming from context and will fetch new data every time there's a change
 2. Info we need from the server 
    - username
    - reputation
    - have & want items, notes and platform
    - steam account link (if provided) & link to all of his other trades
    - when that trade was created
    - premium or non premium user

 ps:
 - if there's 10 or less trades matching those filters we will display 1 page but components, 11 - 20, 2 pages etc
 */