import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import Spinner from '../../components/Spinner'

import infoRL from '../../info/infoRL.json'
import Sidebar from '../../components/Sidebar'
import {SbFiltersRLContext} from '../../components/Rocket League/SbFiltersRLContext'
import RLTradeComponent from '../../components/Rocket League/RLTradeComponent'


function RLTrading() {
  const [tradeInfo, setTradeInfo] = useState()

  const [pageAmount, setPageAmount] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  const {game, searchType, name, paint, cert, itemType, platform} = useContext(SbFiltersRLContext)

  useEffect(()=> {
    // convert names to IDs
    let id = 0
    infoRL.Slots.forEach(type => { type.Items.forEach(item => {
        if (item.Name === name)
          id = item.ItemID
      })
    })

    if (name === "Any")
      id = "any"

    // server request with given filters
    axios.get(`/api/trades/getTrades?itemID=${id}&itemName=${name.toLowerCase()}&cert=${cert.toLowerCase()}&paint=${paint.toLowerCase()}&page=${currentPage}&limit=10`)
    .then (res => {
      // set state with response
      setTradeInfo(res.data.trades)
      setPageAmount(res.data.pages)
    })
    .catch(err => console.log(err))

  }, [game, searchType, name, paint, cert, itemType, platform, currentPage])


  if (tradeInfo){
    return (
        <main className="main">

          {/*
            <div className="main-top">
              <p className="trading-title">Rocket League</p> 
              {tradeInfo.length > 0 && <PageNumbers />}
              {placeholder}
            </div>
          */}

          {tradeInfo.length > 0 ? <TradeComponents /> : <p className="no-trades-text">No trades were found with the given filters</p>}

          {tradeInfo.length > 0 && <PageNumbers />}

        </main>
  )} else return null

  /*-----Functions                -------------*/

  function PageNumbers(){
    if (tradeInfo){
      const pageButtons = []

      const starting_number = () => {
        if (currentPage <= 5 || pageAmount <= 10) 
          return 1 
        else if (currentPage + 5 >= pageAmount)
          return pageAmount - 9
        else 
          return currentPage - 5
      }

      const ending_number = () => {
        if (pageAmount < 10)
          return pageAmount + 1
        else
          return starting_number() + 10
      }

      for (let i = starting_number(); i < ending_number(); i++)
        pageButtons.push(
          i === currentPage ? 
          <button className="pageButton highlighted-page">{i}</button> : 
          <button className="pageButton" onClick={() => setCurrentPage(i)}>{i}</button>
        )

      return(
        <section style={{marginTop: "20px"}} className="page-numbers">
          <div onClick={()=> currentPage > 1 && setCurrentPage(prev => prev - 1)} className="page-left noUserInteraction"></div>
            {pageButtons}
          <div onClick={()=> currentPage < pageAmount && setCurrentPage(prev => prev + 1)} className="page-right noUserInteraction"></div>
        </section>
      )
    }else return null
  }


  function TradeComponents(){
    const tradeComponents =  tradeInfo.map(trade => <RLTradeComponent trade={trade} />)
 
    return(
      <div style={{paddingRight: "31px"}} className="main-middle"> {/*this padding is for the scrollbar*/}
        {tradeComponents}
      </div>
    )
  }
}

export default RLTrading