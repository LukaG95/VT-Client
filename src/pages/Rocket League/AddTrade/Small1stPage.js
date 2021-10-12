import React from "react";
import styles from "./Main.module.scss";
import { PlatformColours, platforms } from "../../../constants/platforms";
import { actions, useTrade } from "../../../context/TradeContext";
import Item from "../../../components/Categories/Rocket League/Item";
import ItemContainer from "../../../components/Categories/Rocket League/ItemContainer";
import PlusItem from "./PlusItem";
import ClearItems from "../../../components/AddTrade/ClearItems";

function Small1stPage({ handleTradeSubmit, setShowPage, setClickedItem }) {
  const [{ have, want, platform, notes, selected }, dispatch] = useTrade();

  return (
    <div className={styles.wrapperSmall}>
      <div className={styles.haveWant}>
        <div className={styles.title}>
          <div className={styles.left}>
            <div className={styles.haveBLUE}></div>
            <p>
              You <b>have</b>
            </p>
          </div>
          <ClearItems
            onClick={() =>
              dispatch({
                type: actions.CLEAR_ITEMS,
                payload: "have",
              })
            }
          />
        </div>
        <div className={styles.sectionSmall}>
          <ItemContainer className={styles.items}>
            {have.map((item, index) =>
              item ? (
                <Item
                  item={item}
                  key={index}
                  hideName
                  added={true}
                  onClick={() => {
                    setClickedItem({ type: "have", index });
                    setShowPage("3");
                  }}
                ></Item>
              ) : (
                <PlusItem
                  key={index}
                  type={selected.type}
                  selected={
                    index === selected.index && selected.type === "have"
                  }
                  onClick={() => {
                    dispatch({
                      type: actions.SET_SELECTED,
                      payload: {
                        type: "have",
                        index,
                      },
                    });
                    setShowPage("2");
                  }}
                />
              )
            )}
          </ItemContainer>
        </div>
        <div className={styles.title}>
          <div className={styles.left}>
            <div className={styles.wantRED}></div>
            <p>
              You <b>want</b>
            </p>
          </div>
          <ClearItems
            onClick={() =>
              dispatch({
                type: actions.CLEAR_ITEMS,
                payload: "want",
              })
            }
          />
        </div>
        <div className={styles.sectionSmall}>
          <ItemContainer className={styles.items}>
            {want.map((item, index) =>
              item ? (
                <Item
                  item={item}
                  key={index}
                  hideName
                  added={true}
                  onClick={() => {
                    setClickedItem({ type: "want", index });
                    setShowPage("3");
                  }}
                ></Item>
              ) : (
                <PlusItem
                  key={index}
                  type={selected.type}
                  selected={
                    index === selected.index && selected.type === "want"
                  }
                  onClick={() => {
                    dispatch({
                      type: actions.SET_SELECTED,
                      payload: {
                        type: "want",
                        index,
                      },
                    });
                    setShowPage("2");
                  }}
                />
              )
            )}
          </ItemContainer>
        </div>
      </div>
      <div className={styles.notesSection}>
        <div className={styles.notesSmall}>
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
          {/*
           <div className={styles.platformsWrapper}>
            <h4>PLATFORM:</h4>
            <div className={styles.platforms}>
              {Object.keys(platforms).map((p) => (
                <label className={styles.platform} key={p}>
                  <input
                    type="radio"
                    checked={platform === platforms[p]}
                    onChange={() =>
                      dispatch({
                        type: actions.SET_PLATFORM,
                        payload: platforms[p],
                      })
                    }
                  />
                  <span style={platform === platforms[p] ? { color: PlatformColours[p] } : {}}>
                    {platforms[p]}
                  </span>
                </label>
              ))}
            </div>
          </div>
          */
          }
         
        </div>
        <button onClick={() => handleTradeSubmit()} className={styles.submit}>
          SUBMIT TRADE
        </button>
      </div>
    </div>
  );
}

export default Small1stPage;
