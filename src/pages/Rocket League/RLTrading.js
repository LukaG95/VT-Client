import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {Helmet} from "react-helmet";
import useWindowDimensions from '../../misc/windowHW'

import infoRL from "../../constants/RLinfo.json";
import { TbFiltersRLContext } from "../../context/TbFiltersRLContext";
import RLTradeComponent from "../../components/Rocket League/RLTradeComponent";
import { createNotification } from "../../misc/ToastNotification";
import NotFoundImage from "../../images/icons/not-found.png";
import pageNumbers from "../../misc/pageNumbers"
import PageNumbersSkeleton from "../../skeleton/PageNumbersSkeleton"
import TradeComponentsSkeleton from "../../skeleton/TradeComponentsSkeleton"


function RLTrading({ home }) {
  const [view, setView] = useState()

  const {
    game,
    searchType,
    name,
    color,
    cert,
    itemType,
    platform,
    resetFilters,
    tradeInfo,
    setTradeInfo,
    pageAmount,
    setPageAmount,
    currentPage,
    setCurrentPage,
  } = useContext(TbFiltersRLContext);
  
  const { width } = useWindowDimensions()

  const tradeComponents = useMemo(() => tradeInfo && 
  tradeInfo.map(trade => <RLTradeComponent trade={trade} />), [tradeInfo])

  useEffect(() => {
    requestTrades(false)

  }, [game, searchType, name, color, cert, itemType, platform, currentPage]);
  

  // this is so that notes height doesn't get messed up 
  // when refreshing page on small width then putting window full screen - when low amount of items in trade and a lot of notes
  useEffect(() => {
    if (width > 1596 && view === "small"){
      requestTrades()
      setView("big")
    } else if (width <= 1596)
      setView("small")

  }, [width]);

  // clean up 
  useEffect(() => {
    return ()=> {
      resetFilters()
      setTradeInfo()
      setCurrentPage(1)
    }
  }, []); 

  if (tradeInfo) {
    return (
      tradeInfo.length > 0 ? 
        <>
         <Helmet>
            {home ? <title>VirTrade</title> : <title>{game} Trading | VirTrade</title>}
            <description>Trade your Rocket League items with others</description>
            <link rel="canonical" href="http://virtrade.gg/trading/rl" />
          </Helmet>
          {pageNumbers(currentPage, pageAmount, setCurrentPage)}

          {tradeComponents}

          {BigPageNumberButtons()}
        </> 
      :
        NoTradesFound()
    );
  } else 
      return (
        <>
          <Helmet>
            {home ? <title>VirTrade</title> : <title>{game} Trading | VirTrade</title>}
            <description>Trade your Rocket League items with others</description>
            <link rel="canonical" href="http://virtrade.gg/trading/rl" />
          </Helmet>
          {PageNumbersSkeleton()} 
          <TradeComponentsSkeleton />
        </>
      )

  /*-----Functions                -------------*/

  function BigPageNumberButtons(){
    return(
      <div className="bigNextPageButtons">
        {currentPage != 1 && <button onClick={()=> {setCurrentPage(prev=> prev-1); window.scrollTo(0, 0)}} style={{marginRight: "20px"}}>Previous page</button>}
        {pageAmount > currentPage && <button onClick={()=> {setCurrentPage(prev=> prev+1); window.scrollTo(0, 0)}}>Next page</button>}
      </div>
    )
  }

  function NoTradesFound() {
    return (
      <div className="no-trades-found-wrapper">
        <img className="noUserInteraction" width="300" height="150" src={NotFoundImage} alt=""></img>
        <h2>
          No <span style={{ color: "#FE3B3B" }}>trades</span> were found for
          your filters
        </h2>
        <p className="no-trades-text">Try a new search or reset the filters</p>
        {/*<button onClick={resetFilters}>Reset filters</button>*/}
      </div>
    );
  }

  function requestTrades(resetInfo = true) {
    // converts names to IDs
    if (resetInfo){
      setTradeInfo()
      setPageAmount()
    }
    let id;
    if (name === "Any") id = "Any";
    else
      infoRL.items.forEach((item) => {
          if (item.Name === name && item.Tradable) id = item.ItemID;
        })

    const route =
      `/api/trades/getTrades?` +
      `search=${searchType}` +
      `&itemID=${id}` +
      `&itemType=${itemType}` +
      `&cert=${cert}` +
      `&color=${color}` +
      `&platform=${platform}` +
      `&page=${currentPage}` +
      `&limit=10`;

      axios
      .get(route)
      .then((res) => { 
        if (res.data.info === "success") {
          console.log(res.data)
          setTradeInfo(res.data.trades);
          setPageAmount(res.data.pages);
        
        }
      })
      .catch((err) => {
        console.log(err.response);
        createNotification(
          "error",
          "Oops, something went wrong",
          "something went wrong"
        );
      });
  }
}

export default RLTrading;
