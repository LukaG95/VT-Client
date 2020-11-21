import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Filter from "bad-words";
import styles from "./Main.module.scss";
import { createNotification } from "../../../misc/ToastNotification";
import FilterBar from "../../../components/Rocket League/FilterBar";
import EditItemDropdown from "../../../components/Rocket League/EditItemDropdown";
import Item from "../../../components/Rocket League/Item";
import ItemContainer from "../../../components/Rocket League/ItemContainer";
import SmallHome from "./SmallHome";
import useWindowDimensions from "../../../misc/windowHW";
import { useTrade } from "../../../context/TradeContext";
import { PlatformColours, Platforms } from "../../../constants/Platforms";
import ClearItems from "../../../components/AddTrade/ClearItems";
import { getTradeableItems } from "../../../constants/Items";
import { useTradeFilters } from "../../../context/TradeFiltersContext";
import PlusItem from "./PlusItem";

const profanityFilter = new Filter({ regex: /^\*|\.|$/gi });

function AddTradeRL() {
  const pathID = useLocation().pathname.substring(17); // Reads url after `/trades/` till the end
  const [
    { have, want, platform, notes, count: tradeCount },
    dispatch,
  ] = useTrade();
  const [filters] = useTradeFilters();
  const [error, setError] = useState({
    trade: "",
    notes: "",
  });
  const [items, setItems] = useState(getTradeableItems());
  const [slot, setSlot] = useState("have");
  const { width } = useWindowDimensions();
  //Filtered Items
  useEffect(() => {
    let items = getTradeableItems();
    if (filters.type !== "Any") {
      items = items.filter((i) => i.Slot === filters.type);
    }
    if (filters.name) {
      items = items.filter(
        (i) => i.Name.toLowerCase().search(filters.name) > -1
      );
    }
    setItems(items);
  }, [filters]);

  //Return Desktop or Mobile
  return width > 1213 ? AddTrade() : <SmallHome />;

  function ItemClick(item) {
    setError({ ...error, trade: "" });
    dispatch({
      type: "addItem",
      payload: {
        type: slot,
        item,
      },
    });
    if (slot === "have" && have.length === 11) return setSlot("want");
    if (slot === "wave" && want.length === 11) return setSlot("have");
  }

  function AddTrade() {
    return (
      <div className={styles.wrapper}>
        <div className={error.trade ? styles.errored : ""}>
          <FilterBar />
          <ItemContainer className={styles.itemContainer}>
            {items.map((item) => (
              <Item
                item={item}
                onClick={() => ItemClick(item)}
                key={item.ItemID}
              />
            ))}
          </ItemContainer>
          <p className={styles.error}>{error.trade}</p>
        </div>
        <div className={styles.haveWant}>
          <div className={styles.section}>
            <div className={styles.title}>
              <p>
                You <b>have</b>
              </p>
              <ClearItems
                onClick={() =>
                  dispatch({
                    type: "clearItems",
                    payload: "have",
                  })
                }
              />
            </div>
            <ItemContainer className={styles.items}>
              {have.map((item) => (
                <Item item={item}><EditItemDropdown item={item}/></Item>
              ))}
              {Array(12 - have.length)
                .fill(null)
                .map((_, index) => (
                  <PlusItem
                    key={index}
                    selected={!index && slot === "have"}
                    onClick={() => setSlot("have")}
                  />
                ))}
            </ItemContainer>
          </div>
          <div className={styles.section} style={{ marginBottom: "20px" }}>
            <div className={styles.title}>
              <p>
                You <b>want</b>
              </p>
              <ClearItems
                onClick={() =>
                  dispatch({
                    type: "clearItems",
                    payload: "want",
                  })
                }
              />
            </div>
            <ItemContainer className="wantItems">
              {want.map((item) => (
                <Item item={item} />
              ))}
              {Array(12 - want.length)
                .fill(null)
                .map((_, index) => (
                  <PlusItem
                    key={index}
                    selected={!index && slot === "want"}
                    onClick={() => setSlot("want")}
                  />
                ))}
            </ItemContainer>
          </div>
        </div>
        <div className={styles.notesSection}>
          <div
            className={`${styles.notes} ${error.notes ? styles.errored : ""}`}
            onClick={() => setError({ ...error, notes: "" })}
          >
            {/* Add Notes */}
            <textarea
              placeholder="Add notes..."
              className={styles.input}
              value={notes}
              onChange={(e) =>
                dispatch({
                  type: "setNotes",
                  payload: e.target.value,
                })
              }
            />
            <div className={styles.platforms}>
              <h4>PLATFORM:</h4>
              {/* Map Platforms */}
              {Object.keys(Platforms).map((p) => (
                <label className={styles.platform} key={p}>
                  <input
                    type="radio"
                    checked={platform === Platforms[p]}
                    onChange={() =>
                      dispatch({
                        type: "setPlatform",
                        payload: Platforms[p],
                      })
                    }
                  />
                  <span style={{ color: PlatformColours[p] }}>
                    {Platforms[p]}
                  </span>
                </label>
              ))}
            </div>
            <p className={styles.error}>{error.notes}</p>
          </div>
          <div>
            <button
              onClick={() => handleTradeSubmit()}
              className={styles.submit}
            >
              SUBMIT TRADE
            </button>
          </div>
        </div>
      </div>
    );
  }

  function handleTradeSubmit() {
    //Check Items
    if (!have.length || !want.length) {
      setError({
        ...error,
        trade: "You have to select at least 1 item in have and want",
      });
      createNotification("error", "Choose items", "choose the items");
      return;
    }
    //Check Notes
    const notesError = checkNotes();
    if (notesError) {
      setError({ ...error, notes: notesError });
      return createNotification("error", notesError, notesError);
    }
    //Create or Edit Trade
    if (pathID === "") {
      //Create Trade
      if (tradeCount >= 15)
        return createNotification(
          "error",
          "You reached the limit of 15 trades",
          "limit 15 trades"
        );
      axios
        .post("/api/trades/createTrade", {
          have: have.map(preparePostItem),
          want: want.map(preparePostItem),
          platform: platform,
          notes: profanityFilter.clean(notes),
        })
        .then((res) => {
          if (res.data.info === "success") {
            //Trade Successfully Created
            dispatch({ type: "reset" });
            dispatch({ type: "addTrade" });
            createNotification(
              "success",
              "Created a new trade",
              "created a new trade"
            );
            setTimeout(
              () =>
                createNotification(
                  "info",
                  `${tradeCount + 1} / 15 RL trades created`,
                  "info on trades created"
                ),
              1000
            );
          }
        })
        .catch((err) => {
          //Error While Creating Trade
          if (err.response)
            createNotification(
              "error",
              "Oops, something went wrong",
              "something went wrong"
            );
          console.log(err.response);
        });
    } else {
      //Edit Trade
      axios
        .post(`/api/trades/editTrade?tradeId=${pathID}`, {
          have: have.map(preparePostItem),
          want: want.map(preparePostItem),
          platform: platform,
          notes: profanityFilter.clean(notes),
        })
        .then((res) => {
          if (res.data.info === "success") {
            //Successfully Edit Trade
            createNotification(
              "success",
              "You have edited your trade",
              "you have edited the trade"
            );
          }
        })
        .catch((err) => {
          //Error While Editing Trade
          if (err.response)
            createNotification(
              "error",
              "Oops, something went wrong",
              "something went wrong"
            );
        });
    }
  }
  // Check trade notes for links & length
  function checkNotes() {
    const notesRegex = /\b(?:http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+(?:[-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/.*)?\b/gm;
    if (notes.match(notesRegex)) return "No links allowed in notes";
    if (notes.length > 300) return "Max 300 characters allowed";
  }

  function preparePostItem(item) {
    return {
      itemID: item.itemID,
      itemName: item.itemName,
      color: item.color,
      colorID: item.colorID,
      cert: item.cert,
      itemType: "item",
      amount: item.amount,
    };
  }
}

export default AddTradeRL;
