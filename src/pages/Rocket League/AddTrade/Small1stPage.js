import React from "react";
import styles from "./Main.module.scss";
import { PlatformColours, Platforms } from "../../../constants/Platforms";
import { useTrade } from "../../../context/TradeContext";
import Item from "../../../components/Rocket League/Item";
import ItemContainer from "../../../components/Rocket League/ItemContainer";
import PlusItem from "./PlusItem";
import ClearItems from "../../../components/AddTrade/ClearItems";

function Small1stPage({ handleTradeSubmit, setShowPage, setClickedItem, slot, setSlot }) {
  const [
    {
      have,
      want,
      platform,
      notes
    },
    dispatch,
  ] = useTrade();

  return (
    <div className={styles.wrapperSmall}>
      <div className={styles.haveWant}>
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
        <div className={styles.sectionSmall} style={{ marginBottom: "10px" }}>
          <ItemContainer className={styles.items}>
            {have.map((item, index) => (
              <Item {...{ item, index }} onClick={() => {
                setClickedItem({ type: "have", index })
                setShowPage("3")
              }} />
            ))}
            {Array(12 - have.length)
              .fill(null)
              .map((_, index) => (
                <PlusItem
                  key={index}
                  selected={!index && slot === "have"}
                  onClick={() => {
                    setShowPage("2")
                    setSlot("have")
                  }}
                />
              ))}
          </ItemContainer>
        </div>
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
        <div className={styles.sectionSmall}>
          <ItemContainer className={styles.items}>
            {want.map((item, index) => (
              <Item {...{ item, index }} onClick={() => {
                setClickedItem({ type: "want", index })
                setShowPage("3")
              }} />            ))}
            {Array(12 - want.length)
              .fill(null)
              .map((_, index) => (
                <PlusItem
                  key={index}
                  selected={!index && slot === "want"}
                  onClick={() => {
                    setShowPage("2")
                    setSlot("want")
                  }} />
              ))}
          </ItemContainer>
        </div>
      </div>
      <div className={styles.notesSection}>
        <div className={styles.notes}>
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
        </div>
        <button
          onClick={() => handleTradeSubmit()}
          className={styles.submit}
        >
          SUBMIT TRADE
            </button>
      </div>
    </div>
  );
}

export default Small1stPage;
