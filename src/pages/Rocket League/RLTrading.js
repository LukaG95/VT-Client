import React, { useContext, useEffect } from "react";
import axios from "axios";

import infoRL from "../../info/infoRL.json";
import { TbFiltersRLContext } from "../../context/TbFiltersRLContext";
import RLTradeComponent from "../../components/Rocket League/RLTradeComponent";
import { createNotification } from "../../App";

function RLTrading() {
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
        console.log(err);
        createNotification(
          "error",
          "Oops, something went wrong",
          "something went wrong"
        );
      });
  }, [game, searchType, name, color, cert, itemType, platform, currentPage]);

  useEffect(() => {
    return resetFilters;
  }, []); // reset filters when we leave trading page

  if (tradeInfo) {
    return (
      <>
        {tradeInfo.length > 0 && <PageNumbers />}
        {tradeInfo.length > 0 ? TradeComponents() : NoTradesFound()}
      </>
    );
  } else return null;

  /*-----Functions                -------------*/

  function PageNumbers() {
    if (tradeInfo) {
      const pageButtons = [];

      const starting_number = () => {
        if (currentPage <= 5 || pageAmount <= 10) return 1;
        else if (currentPage + 5 >= pageAmount) return pageAmount - 9;
        else return currentPage - 5;
      };

      const ending_number = () => {
        if (pageAmount < 10) return pageAmount + 1;
        else return starting_number() + 10;
      };

      for (let i = starting_number(); i < ending_number(); i++)
        pageButtons.push(
          i === currentPage ? (
            <button className="pageButton highlighted-page">{i}</button>
          ) : (
            <button className="pageButton" onClick={() => setCurrentPage(i)}>
              {i}
            </button>
          )
        );

      return (
        <section className="page-numbers-field">
          <div
            onClick={() =>
              currentPage > 1 && setCurrentPage((prev) => prev - 1)
            }
            className="page-left noUserInteraction"
          ></div>
          {pageButtons}
          <div
            onClick={() =>
              currentPage < pageAmount && setCurrentPage((prev) => prev + 1)
            }
            className="page-right noUserInteraction"
          ></div>
        </section>
      );
    } else return null;
  }

  function TradeComponents() {
    const tradeComponents = tradeInfo.map((trade) => (
      <RLTradeComponent trade={trade} />
    ));

    return <>{tradeComponents}</>;
  }

  function NoTradesFound() {
    return (
      <div className="no-trades-found-wrapper">
        <img
          className="noUserInteraction"
          src={require("../../images/other/No trades found.png")}
          alt=""
        ></img>
        <h2>
          No <span style={{ color: "#FE3B3B" }}>trades</span> were found for
          your filters
        </h2>
        <p className="no-trades-text">Try a new search or reset the filters</p>
        <button onClick={resetFilters}>Reset filters</button>
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
      `&page=${currentPage}` +
      `&limit=10`;

    return route;
  }
}

export default RLTrading;
