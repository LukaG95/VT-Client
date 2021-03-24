import React, { useState, useEffect, useMemo, useContext } from "react";
import { useParams } from "react-router-dom";
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
import { PlatformColours, platforms } from "../../../constants/platforms";
import ClearItems from "../../../components/AddTrade/ClearItems";
import { getTradeableItems } from "../../../constants/Items";
import { useTradeFilters } from "../../../context/TradeFiltersContext";
import { UserContext } from "../../../context/UserContext";
import PlusItem from "./PlusItem";
import {Helmet} from "react-helmet";
import {ReactComponent as Steam} from "../../../images/icons/steam.svg"
import {ReactComponent as PSN} from "../../../images/icons/playstation.svg"
import {ReactComponent as Nintendo} from "../../../images/icons/switch.svg"
import {ReactComponent as Xbox} from "../../../images/icons/xbox.svg"
import {ReactComponent as Epic} from "../../../images/icons/epic.svg"

// const profanityFilter = new Filter({ regex: /^\*|\.|$/gi });

function AddTradeRL() {
  const { pathID } = useParams() // Reads url after `/trades/` till the end

  const [
    { have, want, platform, notes, count: tradeCount, selected },
    dispatch,
  ] = useTrade();
  const [filters] = useTradeFilters();
  const { user } = useContext(UserContext);
  const [error, setError] = useState({
    trade: "",
    notes: "",
  });
  const [items, setItems] = useState([]);
  const { width } = useWindowDimensions();
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
      items.map((item, i) => ( 
        <Item item={item} lazy={true} onClick={() => ItemClick(item)} key={item.itemID} />
        // eslint-disable-next-line react-hooks/exhaustive-deps
      )),
    [items]
  );

  //Return Desktop or Mobile
  return (
    <>
      <Helmet>
        <title>New Trade | VirTrade</title>
        <description>Create a new Rocket League trade post</description>
        <link rel="canonical" href="http://virtrade.gg/trading/rl/new" />
      </Helmet>
      {
        width > 1213 ? AddTrade()
          :
        <SmallHome {...{ handleTradeSubmit, ItemClick }} />
      }
    </>
  )
    
    /*
  return  (
    AddTrade()
  ) : (
      <SmallHome {...{ handleTradeSubmit, ItemClick }} />
    );*/

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
        <div>
          <FilterBar />
          <ItemContainer className={styles.itemContainer}>
            {inventoryItems}
          </ItemContainer>
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
                  <Item item={item} key={index} added={true} hideName>
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
                  <Item item={item} key={index} added={true} hideName>
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
            className={styles.notes}
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
          </div>
            <div className={styles.platformsBig}>
              {/* Map platforms */}
              {Object.keys(platforms).map((p) => (
                <div 
                  className={[styles.platform, platform === platforms[p] && styles[p]].join(" ")}
                  onClick={() =>
                    dispatch({
                      type: actions.SET_PLATFORM,
                      payload: platforms[p],
                    })
                  }
                >
                  {icon(p)}
                </div>
              ))}
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
    
    //Check Platforms
    const platformsError = checkPlatforms();
    if (platformsError) {
      setError({ ...error, notes: platformsError });
      return createNotification("error", platformsError, platformsError);
    }

    //Create or Edit Trade
    if (!pathID) {
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
              500
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
            console.error(err.response);
        });
    }
  }
  // Check trade notes for links & length
  function checkNotes() {
    const notesRegex = /\b(?:http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+(?:[-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/.*)?\b/gm;
    if (notes.match(notesRegex)) return "No links allowed in notes";
    if (notes.length > 300) return "Max 300 characters allowed";
  }

  // Check if user linked the platform he wants to create the trade in
  function checkPlatforms(){
    const userPlatform = platform.toLowerCase()

    if (userPlatform === "switch"){
      if (!user[userPlatform]) return `Link your ${platform} IGN in settings`}
    else {
      if (!user[userPlatform]) return `Verify your ${platform} IGN in settings`
      else if (!user[userPlatform].verified) return `Verify your ${platform} IGN in settings` 
    }

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

  function icon(p){
    const platforms={   
      steam: Steam,
      psn: PSN,
      switch: Nintendo,
      xbox: Xbox,
      epic: Epic
    }
    const Platform = platforms[p.toLowerCase()]
    return <Platform className={styles.platformIcon}/>
  }
}

// className={[styles.avatar, message.sender._id === myID && styles.myChatColor].join(" ")}

export default AddTradeRL;
