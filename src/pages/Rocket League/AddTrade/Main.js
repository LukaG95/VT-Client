import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
//import Filter from "bad-words";
import styles from "./Main.module.scss";
import { createNotification } from "../../../misc/ToastNotification";
import FilterBar from "../../../components/Rocket League/FilterBar";
import EditItemDropdown from "../../../components/Rocket League/EditItemDropdown";
import Item from "../../../components/Rocket League/Item";
import ItemContainer from "../../../components/Rocket League/ItemContainer";
import SmallHome from "./SmallHome";
import useWindowDimensions from "../../../misc/windowHW";
import { actions, useTrade } from "../../../context/TradeContext";
import { PlatformColours, Platforms } from "../../../constants/Platforms";
import ClearItems from "../../../components/AddTrade/ClearItems";
import { getTradeableItems } from "../../../constants/Items";
import { useTradeFilters } from "../../../context/TradeFiltersContext";
import PlusItem from "./PlusItem";

// const profanityFilter = new Filter({ regex: /^\*|\.|$/gi });

function AddTradeRL() {
  const pathID = useLocation().pathname.substring(17); // Reads url after `/trades/` till the end
  const [
    { have, want, platform, notes, count: tradeCount, selected },
    dispatch,
  ] = useTrade();
  const [filters] = useTradeFilters();
  const [error, setError] = useState({
    trade: "",
    notes: "",
  });
  const [items, setItems] = useState([]);
  const { width, height } = useWindowDimensions();
  //Edit Trade
  useEffect(() => {
    if (pathID) {
      axios.get(`/api/trades/getTrade/${pathID}`)
        .then(({ data }) => {
          if (data.idMatch) {
            dispatch({
              type: actions.SET_ITEMS,
              payload: {
                notes: data.trade.notes,
                platform: data.trade.platform,
                have: [...data.trade.have, ...Array(12 - data.trade.have.length).fill(null)],
                want: [...data.trade.want, ...Array(12 - data.trade.want.length).fill(null)]
              }
            })
          }
        })
        .catch(err => console.log("Error: " + err))
    }
  }, [pathID])
  //Filtered Items
  useEffect(() => {
    process.nextTick(() => {
      let items = getTradeableItems();
      if (filters.type !== "Any") {
        items = items.filter((i) => i.itemType === filters.type);
      }
      if (filters.name) {
        items = items.filter(
          (i) => i.itemName.toLowerCase().search(filters.name) > -1
        );
      }
      setItems(items);
    });
  }, [filters]);

  const inventoryItems = useMemo(
    () =>
      items.map((item) => (
        <Item item={item} onClick={() => ItemClick(item)} key={item.itemID} />
        // eslint-disable-next-line react-hooks/exhaustive-deps
      )),
    [items]
  );

  //Return Desktop or Mobile
  return width > 1213 ? (
    AddTrade()
  ) : (
      <SmallHome {...{ handleTradeSubmit, ItemClick }} />
    );

  function ItemClick(item) {
    setError({ ...error, trade: "" });
    dispatch({
      type: actions.ADD_ITEM,
      payload: item,
    });
  }

  function AddTrade() {
    return (
      <div className={styles.wrapper}>
        <div className={error.trade ? styles.errored : ""}>
          <FilterBar />
          <ItemContainer className={styles.itemContainer}>
            {inventoryItems}
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
                    type: actions.CLEAR_ITEMS,
                    payload: "have",
                  })
                }
              />
            </div>
            <ItemContainer className={styles.items}>
              {have.map((item, index) =>
                item ? (
                  <Item item={item} key={index} hideName>
                    <EditItemDropdown {...{ item, index, type: "have" }} />
                  </Item>
                ) : (
                    <PlusItem
                      key={index}
                      selected={
                        index === selected.index && selected.type === "have"
                      }
                      onClick={() =>
                        dispatch({
                          type: actions.SET_SELECTED,
                          payload: {
                            index,
                            type: "have",
                          },
                        })
                      }
                    />
                  )
              )}
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
                    type: actions.CLEAR_ITEMS,
                    payload: "want",
                  })
                }
              />
            </div>
            <ItemContainer className={styles.items}>
              {want.map((item, index) =>
                item ? (
                  <Item item={item} key={index} hideName>
                    <EditItemDropdown {...{ item, index, type: "want" }} />
                  </Item>
                ) : (
                    <PlusItem
                      key={index}
                      selected={
                        index === selected.index && selected.type === "want"
                      }
                      onClick={() =>
                        dispatch({
                          type: actions.SET_SELECTED,
                          payload: {
                            index,
                            type: "want",
                          },
                        })
                      }
                    />
                  )
              )}
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
                  type: actions.SET_NOTES,
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
                        type: actions.SET_PLATFORM,
                        payload: Platforms[p],
                      })
                    }
                  />
                  <span style={platform === Platforms[p] ? { color: PlatformColours[p] } : {}}>
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
    const filtered = {
      have: have.filter((i) => i),
      want: want.filter((i) => i),
    };
    if (!filtered.have.length || !filtered.want.length) {
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
          have: filtered.have.map(preparePostItem),
          want: filtered.want.map(preparePostItem),
          platform: platform,
          notes: notes,
        })
        .then((res) => {
          if (res.data.info === "success") {
            //Trade Successfully Created
            dispatch({ type: actions.RESET });
            dispatch({ type: actions.ADD_TRADE });
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
          console.error(err.response);
        });
    } else {
      //Edit Trade
      axios
        .post(`/api/trades/editTrade?tradeId=${pathID}`, {
          have: filtered.have.map(preparePostItem),
          want: filtered.want.map(preparePostItem),
          platform: platform,
          notes: notes,
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
