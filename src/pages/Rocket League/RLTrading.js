import React, { useContext, useEffect, useMemo } from "react";
import axios from "axios";

import infoRL from "../../constants/RocketLeagueInfo.json";
import { TbFiltersRLContext } from "../../context/TbFiltersRLContext";
import RLTradeComponent from "../../components/Rocket League/RLTradeComponent";
import { createNotification } from "../../misc/ToastNotification";
import NotFoundImage from "../../images/icons/not-found.png";
import pageNumbers from "../../misc/pageNumbers"
import PageNumbersSkeleton from "../../skeleton/PageNumbersSkeleton"
import TradeComponentsSkeleton from "../../skeleton/TradeComponentsSkeleton"
import {Helmet} from "react-helmet";

function RLTrading({ home }) {
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

  const tradeComponents = useMemo(() => tradeInfo && 
  tradeInfo.map(trade => <RLTradeComponent trade={trade} />), [tradeInfo])

  useEffect(() => {
    const route = tradeFilters();

    axios
      .get(route)
      .then((res) => { 
        if (res.data.info === "success") {
   
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
      
  }, [game, searchType, name, color, cert, itemType, platform, currentPage]);

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

  function tradeFilters() {
    // converts names to IDs
    let id;
    if (name === "Any") id = "Any";
    else
      infoRL.Slots.forEach((Slot) =>
        Slot.Items.forEach((item) => {
          if (item.Name === name && item.Tradable) id = item.ItemID;
        })
      );

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

    return route;
  }
}

export default RLTrading;
