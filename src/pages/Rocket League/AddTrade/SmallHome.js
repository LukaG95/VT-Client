import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Filter from "bad-words";

import { createNotification } from "../../../misc/ToastNotification";
import { TradeContextRL } from "../../../context/TradeContextRL";
import Small1stPage from "./Small1stPage";
import SmallChooseItems from "./SmallChooseItems";
import Small3rdPage from "./Small3rdPage";

const profanityFilter = new Filter({ regex: /^\*|\.|$/gi });

function SmallHome() {
  const [showPage, setShowPage] = useState("1");
  const [clickedItem, setClickedItem] = useState(); // the item that we click on when we go to the 3rd page

  const {
    have,
    want,
    platform,
    notes,
    setNotes,
    clearWantItems,
    clearHaveItems,
    tradesAmount,
    setTradesAmount,
  } = useContext(TradeContextRL);

  const pathID = useLocation().pathname.substring(17); // reads url after /trades/ till the end

  return (
    <div className="add-trade-wrapper-SMALL">
      {showPage === "1" ? (
        <Small1stPage
          setShowPage={setShowPage}
          setClickedItem={setClickedItem}
          handleTradeSubmit={handleTradeSubmit}
        />
      ) : showPage === "2" ? (
        <SmallChooseItems setShowPage={setShowPage} />
      ) : showPage === "3" ? (
        <Small3rdPage setShowPage={setShowPage} clickedItem={clickedItem} />
      ) : null}
    </div>
  );

  /*-----Functions                -------------*/

  function handleTradeSubmit() {
    if (have && want) {
      if (!checkAddedItems()) {
        createNotification("error", "Choose items", "choose the items");
        return;
      } else if (checkNotes()) {
        createNotification("error", checkNotes(), checkNotes());
        return;
      } else {
        let haveRefactor = [];
        let wantRefactor = [];

        have.forEach((item) => {
          if (item.isAdded) {
            let readyItem = {
              itemID: item.itemID,
              itemName: item.itemName,
              color: item.color,
              colorID: item.colorID,
              cert: item.cert,
              itemType: "item", // needs work
              amount: item.amount,
            };
            haveRefactor.push(readyItem);
          }
        });

        want.forEach((item) => {
          if (item.isAdded) {
            let readyItem = {
              itemID: item.itemID,
              itemName: item.itemName,
              color: item.color,
              colorID: item.colorID,
              cert: item.cert,
              itemType: "item", // needs work
              amount: item.amount,
            };
            wantRefactor.push(readyItem);
          }
        });

        if (pathID === "") {
          if (tradesAmount >= 15) {
            createNotification(
              "error",
              "You reached the limit of 15 trades",
              "limit 15 trades"
            );
            return;
          }
          axios
            .post("/api/trades/createTrade", {
              have: haveRefactor,
              want: wantRefactor,
              platform: platform,
              notes: profanityFilter.clean(notes),
            })
            .then((res) => {
              if (res.data.info === "success") {
                clearWantItems();
                clearHaveItems();
                setNotes("");
                createNotification(
                  "success",
                  "Created a new trade",
                  "created a new trade"
                );
                setTimeout(
                  () =>
                    createNotification(
                      "info",
                      `${tradesAmount + 1} / 15 RL trades created`,
                      "info on trades created"
                    ),
                  1000
                );
                setTradesAmount((prev) => prev + 1);
              }
            })
            .catch((err) => {
              if (err.response)
                createNotification(
                  "error",
                  "Oops, something went wrong",
                  "something went wrong"
                );
              console.log(err.response);
              console.log(have);
            });
        } else {
          axios
            .post(`/api/trades/editTrade?tradeId=${pathID}`, {
              have: haveRefactor,
              want: wantRefactor,
              platform: platform,
              notes: profanityFilter.clean(notes),
            })
            .then((res) => {
              if (res.data.info === "success") {
                createNotification(
                  "success",
                  "You have edited your trade",
                  "you have edited the trade"
                );
              }
            })
            .catch((err) => {
              if (err.response)
                createNotification(
                  "error",
                  "Oops, something went wrong",
                  "something went wrong"
                );
            });
        }
      }
    }
  }

  // returns true if there are items added in have and in want
  function checkAddedItems() {
    let x = false,
      y = false;
    have.forEach((item) => {
      if (item.isAdded === true) {
        x = true;
        return;
      }
    });
    want.forEach((item) => {
      if (item.isAdded === true) {
        y = true;
        return;
      }
    });
    return x && y;
  }

  // check notes for limits / errors
  function checkNotes() {
    if (
      notes.match(
        /\b(?:http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+(?:[-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/.*)?\b/gm
      )
    )
      return "No links allowed in notes";
    else if (notes.length > 300) return "Max 300 characters allowed";
  }
}

export default SmallHome;
