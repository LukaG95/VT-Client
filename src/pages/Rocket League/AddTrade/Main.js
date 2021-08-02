import React, { useState, useEffect, useMemo, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import Filter from "bad-words";
import styles from "./Main.module.scss";
import { createNotification } from "../../../misc/ToastNotification";
import FilterBar from "../../../components/Categories/Rocket League/FilterBar";
import EditItemDropdown from "../../../components/Categories/Rocket League/EditItemDropdown";
import Item from "../../../components/Categories/Rocket League/Item";
import ItemOther from "../../../components/Categories/Money/Item";
import ItemContainer from "../../../components/Categories/Rocket League/ItemContainer";
import SmallHome from "./SmallHome";
import useWindowDimensions from "../../../misc/windowHW";
import { actions, useTrade } from "../../../context/TradeContext";
import { platforms } from "../../../constants/platforms";
import ClearItems from "../../../components/AddTrade/ClearItems";
import { getTradeableItems } from "../../../constants/Items";
import { useTradeFilters } from "../../../context/TradeFiltersContext";
import { UserContext } from "../../../context/UserContext";
import { PopupContext } from "../../../context/PopupContext";
import {CategoriesJson} from "../../../constants/Categories/Categories";
import PlusItem from "./PlusItem";
import {Helmet} from "react-helmet";
import {ReactComponent as Steam} from "../../../images/icons/steam.svg"
import {ReactComponent as PSN} from "../../../images/icons/playstation.svg"
import {ReactComponent as Nintendo} from "../../../images/icons/switch.svg"
import {ReactComponent as Xbox} from "../../../images/icons/xbox.svg"
import {ReactComponent as Epic} from "../../../images/icons/epic.svg"
import { ReactComponent as MagnifyingGlass } from "../../../images/icons/magnifying glass.svg";

// const profanityFilter = new Filter({ regex: /^\*|\.|$/gi });

function AddTradeRL() {
  const { pathID } = useParams() 

  const [
    { have, want, platform, notes, count: tradeCount, selected },
    dispatch,
  ] = useTrade();
  const [filters, dispatch2] = useTradeFilters();
  const { user } = useContext(UserContext);
  const [error, setError] = useState({
    trade: "",
    notes: "",
  });
  const [items, setItems] = useState([]);
  const { width } = useWindowDimensions();
  const { setOpenEditTradePopup } = useContext(PopupContext);

  let DisplayItem = null
  if (filters.category === "Rocket League")
    DisplayItem = Item
  else 
    DisplayItem = ItemOther

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
                platform: data.trade.platform.name,
                have: [...data.trade.have, ...Array(12 - data.trade.have.length).fill(null)],
                want: [...data.trade.want, ...Array(12 - data.trade.want.length).fill(null)]
              }
            })
          }
        })
        .catch(err => {})
    }
  }, [pathID])
  //Filtered Items
  useEffect(() => {
    process.nextTick(() => {
      if(filters.category === "Rocket League")
        setItems(getRocketLeagueItems()); 
      else 
        setItems(getManualItems())
    });
  }, [filters]);

  const inventoryItems = useMemo(
    () => {
      let returnedItems = []
      let currentType = ""
      // inserting item types
      for (let i = 0; i<items.length; i++){
        if (items[i].itemType !== currentType){
          returnedItems.push(<div className={styles.itemType}>{items[i].itemType==="1Special" ? "Special" : items[i].itemType}</div>)
          returnedItems.push(<DisplayItem category={filters.category} item={items[i]} lazy={true} onClick={() => ItemClick(items[i])} key={items[i].itemID} /> )
          currentType = items[i].itemType
        }
        else
          returnedItems.push(<DisplayItem category={filters.category} item={items[i]} lazy={true} onClick={() => ItemClick(items[i])} key={items[i].itemID} /> )
        
      }
      return returnedItems
    },
    [items, filters.category]
  );

  //Return Desktop or Mobile
  return (
    <>
      <Helmet>
        {!pathID ? <title>New Trade | VirTrade</title> : <title>Edit Trade | VirTrade</title>}
        {!pathID ? <meta name="description" content="Create a new Rocket League trade post" /> : <meta name="description" content="Edit your Rocket League trade post" />}
        <link rel="canonical" href="http://virtrade.gg/trading/rl/new" />
      </Helmet>
      {
        width > 1213 ? AddTrade()
          :
        <SmallHome {...{ handleTradeSubmit, ItemClick }} />
      }
    </>
  )

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
        <div className={styles.leftSide}>
         
          <div className="initial-filter-header-addTrade">
            <MagnifyingGlass style={{ width: "15px", height: "15px"}} />
            <input
              placeholder="Search items..."
              onChange={(e) => {
                if (e.target.value !== filters.name)
                  dispatch2({
                    type: "setFilter",
                    payload: {
                      type: "name",
                      value: e.target.value.toLowerCase(),
                    },
                  });
              }}
            />
          </div>

          <div className={styles.itemsField}>
            <ItemContainer className={styles.itemContainer} csgo={filters.category === "CSGO"}>
              {filters.category === "CSGO" ? "Coming Soon" : inventoryItems}
            </ItemContainer>
          </div>
          
        </div>
        <FilterBar />
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
                  <DisplayItem item={item} key={index} added={true} hideName>
                    <EditItemDropdown {...{ item, index, type: "have" }} />
                  </DisplayItem>
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
                  <DisplayItem item={item} key={index} added={true} hideName>
                    <EditItemDropdown {...{ item, index, type: "want" }} />
                  </DisplayItem>
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
          {/*
            <div className={styles.platformsBig}>
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
            */}
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
      createNotification("error", `Choose at least 1 item you ${!filtered.have.length ? "have" : "want"}`, "choose the items");
      return;
    }
    //Check Notes
    const notesError = checkNotes();
    if (notesError) {
      setError({ ...error, notes: notesError });
      return createNotification("error", notesError, notesError);
    }

    //Check Platforms - currently disabled
    /*
    const platformsError = checkPlatforms();
    if (platformsError) {
      setError({ ...error, notes: platformsError });
      return createNotification("error", platformsError, platformsError, "/account/settings/platforms");
    }
    */

    //Check activated account
    if (!user.activatedAccount){
      createNotification("error", "Confirm your email before posting trades", "Confirm your email before posting trades", "/account/settings/email");
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
            setOpenEditTradePopup(true)
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
    if (notes.length > 1000) return "Max 1000 characters allowed";
  }

  // Check if user linked the platform he wants to create the trade in - currently disabled
  /*
  function checkPlatforms(){
    const userPlatform = platform.toLowerCase()

    if (userPlatform === "xbox" || userPlatform === "steam" || userPlatform === "switch"){
      if (!user[userPlatform]) return `Link your ${platform} IGN in settings`}
    else {
      if (!user[userPlatform]) return `Verify your ${platform} IGN in settings`
      else if (!user[userPlatform].verified) return `Verify your ${platform} IGN in settings` 
    }

  }
  */

  function preparePostItem(item) {
    return {
      itemID: item.itemID,
      itemName: item.itemName,
      color: item.color,
      colorID: item.colorID,
      cert: item.cert,
      blueprint: item.blueprint,
      amount: item.amount
    };
  }

  /*
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
  */

  function getManualItems(){
    return CategoriesJson[filters.category].map(item => item).sort((a, b)=> {
      const x = a.itemName.toLowerCase();
      const y = b.itemName.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })
  }

  function getRocketLeagueItems(){
    let RLitems = getTradeableItems();
     
    if (filters.type === "Blueprint"){
      RLitems = RLitems.filter((i) => i.blueprintable)
    }
    else if (filters.type !== "Any") {
      RLitems = RLitems.filter((i) => i.itemType === filters.type)
    }  
    if (filters.name) {
      RLitems = RLitems.filter(
        (i) => i.itemName.toLowerCase().search(filters.name) > -1
      );
    }
  
    if (filters.type === "Blueprint"){
      RLitems = RLitems.map(item => ({...item, blueprint: true}))
    } else{
      RLitems = RLitems.map(item => ({...item, blueprint: false}))
    }
  
    if (filters.quality !== "Any") {
      RLitems = RLitems.filter((i) => i.quality === filters.quality)
    }  
  
    RLitems.sort((a, b)=> {
      const x = a.itemName.toLowerCase();
      const y = b.itemName.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })
  
    RLitems.sort((a, b)=> {
      const x = a.quality.toLowerCase();
      const y = b.quality.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })
    
    RLitems.sort((a, b)=> {
      const x = a.itemType.toLowerCase();
      const y = b.itemType.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })
  
    return RLitems
  }
}



// className={[styles.avatar, message.sender._id === myID && styles.myChatColor].join(" ")}

export default AddTradeRL;