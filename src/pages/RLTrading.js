import React, {useState, useContext, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import {FiltersRLContext} from '../components/FiltersRL_Context'
import Spinner from '../components/Spinner'
import rl_items from '../info/rl_items.json'
import RLTradeComponent from '../components/RLTradeComponent'
import axios from 'axios'

function RLTrading() {
  const [tradeInfo, setTradeInfo] = useState()

  const [pageAmount, setPageAmount] = useState(100)
  const [currentPage, setCurrentPage] = useState(1)

  const {game, searchType, name, paint, cert, itemType, platform} = useContext(FiltersRLContext)

  useEffect(()=> {
    // convert names to IDs
    let id = 0
    rl_items.Slots.forEach(type => { type.Items.forEach(item => {
        if (item.Name === name)
          id = item.ItemID
      })
    })

    if (name === "Any")
      id = "any"

    // server request with given filters
    axios.get(`/api/trades/getTrades?itemID=${id}&itemName=${name.toLowerCase()}&cert=${cert.toLowerCase()}&paint=${paint.toLowerCase()}&page=${currentPage}`)
    .then (res => {

      // set state with response
      setTradeInfo(res.data.trades)
    })
    .catch(err => console.log(err))

  }, [game, searchType, name, paint, cert, itemType, platform, currentPage])

  function PageNumbers(){
    const pageButtons = []

    const starting_number = () => {
      if (currentPage <= 5) 
        return 1 
      else if (currentPage + 5 >= pageAmount)
        return pageAmount - 9
      else 
        return currentPage - 5
    }
  
    for (let i = starting_number(); i < starting_number() + 10; i++)
      pageButtons.push(
        i === currentPage ? 
        <button className="pageButton highlighted-page">{i}</button> : 
        <button className="pageButton" onClick={() => setCurrentPage(i)}>{i}</button>
      )

    return(
      <section className="page-numbers">
        <div onClick={()=> currentPage > 1 && setCurrentPage(prev => prev - 1)} className="page-left noUserInteraction"></div>
          {pageButtons}
        <div onClick={()=> currentPage < 100 && setCurrentPage(prev => prev + 1)} className="page-right noUserInteraction"></div>
      </section>
    )
  }

  function TradeComponents(){
      if (tradeInfo){
        var tradeComponents = tradeInfo.map(trade => <RLTradeComponent trade={trade} />)

      }else return null // <Spinner className="newPosition" />

    return(
      <div className="main-middle">
        {tradeComponents}
      </div>
    )
  }

  return (
    <div className="secondaryWrapper">  

      <Sidebar />
      
      <main className="main">

        <div className="main-top">
          <p className="trading-title">Rocket League PC</p> 
          <PageNumbers />
          {/* placeholder */}
        </div>

        <TradeComponents />

        <section className="page-numbers"></section>

      </main>

    </div>
  )
}

export default RLTrading