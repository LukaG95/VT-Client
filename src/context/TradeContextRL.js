import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";

const TradeContextRL = React.createContext();

const BlankItem = {
  id: 0,
  isFocused: true,
  isDropdown: false,
  itemName: "",
  itemID: "None",
  color: "None",
  colorID: 0,
  cert: "None",
  amount: 1,
  isAdded: false,
};

function TradeContextProviderRL({ children }) {
  const pathID = useLocation().pathname.substring(17);
  const { myID } = useContext(UserContext);

  const [gotInfo, setGotInfo] = useState(false);
  const [have, setHave] = useState(Array(12).fill(BlankItem));
  const [want, setWant] = useState(Array(12).fill(BlankItem));
  const [notes, setNotes] = useState("");
  const [platform, setPlatform] = useState("Steam");
  const [tradesAmount, setTradesAmount] = useState();
  const [displayPage, setDisplayPage] = useState(false);

  // adds event listener to trigger click() function that sets all DDs to false on click
  useEffect(() => {
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("click", click);
    };
  }, [gotInfo]);

  // if we're not editing a trade we just need trades amount, if we are we check if user is the creator of the trade in edit
  useEffect(() => {
    if (myID) {
      if (pathID === "") {
        axios
          .get(`/api/trades/getUserTrades?searchId=${myID}`)
          .then((res) => {
            setTradesAmount(res.data.trades.length);
            setDisplayPage(true);
          })
          .catch((err) => {
            console.log(err.response);
            if (err.response)
              if (err.response.data.info === "no trades") {
                setTradesAmount(0);
                setDisplayPage(true);
              }
          });
      } else {
        axios
          .get(`/api/trades/getTrade/${pathID}`)
          .then((res) => {
            if (res.data.idMatch) {
              setTradeState(res);

              setGotInfo(true);
              setDisplayPage(true);
            } else window.location.href = "/trading/rl";
          })
          .catch((err) => console.log("Error: " + err));
      }
    }
  }, [myID]);

  return (
    <TradeContextRL.Provider
      value={{
        have,
        setHave,
        want,
        setWant,
        platform,
        setPlatform,
        notes,
        setNotes,
        manageFocus,
        pushItem,
        clearHaveItems,
        clearWantItems,
        setIsDropdown,
        deleteRLitem,
        tradesAmount,
        setTradesAmount,
        gotInfo,
        displayPage,
      }}
    >
      {children}
    </TradeContextRL.Provider>
  );

  /*-----Functions                -------------*/

  // sets all dropdowns to false on click
  function click(e) {
    if (e.target.parentNode === null) return;
    if (
      e.target.name !== "enableDropdown" &&
      e.target.className !== "rl-icon-dropdown" &&
      e.target.className !== "rl-attribute-dd-item" &&
      e.target.parentNode.name !== "enableDropdown" &&
      e.target.className !== "enableDropdown" &&
      e.target.className !== "item_name"
    ) {
      let temp = [];
      have.forEach((item) => {
        item.isDropdown = false;
        temp.push(item);
      });
      setHave(temp);

      // console.log(e.target)

      temp = [];
      want.forEach((item) => {
        item.isDropdown = false;
        temp.push(item);
      });
      setWant(temp);
    }
  }

  // clears all fields that have isFocused (where item is then pushed)
  function clearFocusedFields() {
    let temp = [];

    have.forEach((item) => {
      if (item.isFocused) item.isFocused = false;
      temp.push(item);
    });

    setHave(temp);

    temp = [];

    want.forEach((item) => {
      if (item.isFocused) item.isFocused = false;
      temp.push(item);
    });

    setWant(temp);
  }

  // removes target item from state
  function deleteRLitem(id) {
    clearFocusedFields();

    let temp = [];

    have.forEach((item) => {
      if (item.id === id) {
        item.color = "None";
        item.colorID = 0;
        item.itemID = "None";
        item.itemName = "";
        item.cert = "None";
        item.amount = 1;
        item.isFocused = true;
        item.isDropdown = false;
        item.isAdded = false;
        temp.push(item);
      } else temp.push(item);
    });
    setHave(temp);

    temp = [];

    want.forEach((item) => {
      if (item.id === id) {
        item.color = "None";
        item.colorID = 0;
        item.itemID = "None";
        item.itemName = "";
        item.cert = "None";
        item.amount = 1;
        item.isFocused = true;
        item.isDropdown = false;
        item.isAdded = false;
        temp.push(item);
      } else temp.push(item);
    });
    setWant(temp);
  }

  // sets dropdown state to true on clicked item
  function setIsDropdown(id) {
    let temp = [];
    have.forEach((item) => {
      console.log(typeof item.id);
      if (item.id === id) {
        item.isDropdown = !item.isDropdown;
        temp.push(item);
      } else {
        item.isDropdown = false;
        temp.push(item);
      }
    });
    setHave(temp);

    temp = [];
    want.forEach((item) => {
      if (item.id === id) {
        item.isDropdown = !item.isDropdown;
        temp.push(item);
      } else {
        item.isDropdown = false;
        temp.push(item);
      }
    });
    setWant(temp);
  }

  // deletes all the focuses and focuses on the clicked field
  function manageFocus(e) {
    if (e.target.id !== "focusedButton") {
      let temp = [];
      have.forEach((item) => {
        if (item.isFocused === true) {
          item.isFocused = false;
          temp.push(item);
        } else if (parseInt(e.target.name) === item.id) {
          item.isFocused = true;
          temp.push(item);
        } else temp.push(item);
      });
      setHave(temp);

      temp = [];

      want.forEach((item) => {
        if (item.isFocused === true) {
          item.isFocused = false;
          temp.push(item);
        } else if (parseInt(e.target.name) === item.id) {
          item.isFocused = true;
          temp.push(item);
        } else temp.push(item);
      });
      setWant(temp);
    }
  }

  // pushes the clicked item on the focused field and focuses the next field
  function pushItem({ ItemID, Name }) {
    let current = undefined;
    let temp = [];
    have.forEach((item) => {
      if (item.isFocused === true) {
        item.isFocused = false;
        item.itemID = ItemID;
        item.itemName = Name;
        item.isAdded = true;
        current = item.id;

        if (allFieldsJammed(item.id)) {
          const { have_focused, want_focused } = focuseOnCorrectField(
            have,
            want
          );

          setHave(have_focused);
          setWant(want_focused);
        }
      }
      if (item.id === current + 1 && !item.isAdded) item.isFocused = true;
      else if (item.id === current + 1 && item.isAdded) current++;

      temp.push(item);
    });
    setHave(temp);

    temp = [];

    want.forEach((item) => {
      if (item.isFocused === true) {
        item.isFocused = false;
        item.itemID = ItemID;
        item.itemName = Name;
        item.isAdded = true;
        current = item.id;

        if (allFieldsJammed(item.id)) {
          const { have_focused, want_focused } = focuseOnCorrectField(
            have,
            want
          );

          setHave(have_focused);
          setWant(want_focused);
        }
      }

      if (item.id === current + 1 && !item.isAdded) item.isFocused = true;
      else if (item.id === current + 1 && item.isAdded) current++;

      temp.push(item);
    });
    setWant(temp);
  }

  // checks if all fields in front of the given id have items added
  function allFieldsJammed(id) {
    const all = [...have, ...want];

    if (id === 23) return true;

    for (let i = id + 1; i <= 23; i++) {
      if (!all[i].isAdded) return false;
    }
    return true;
  }

  // clears all have items
  function clearHaveItems() {
    let empty = true;
    have.forEach((item) => {
      if (item.isAdded) empty = false;
    });
    if (empty) return null;
    const have_focused = focuseOnCorrectField(Array(12).fill(BlankItem), false);
    setHave(have_focused);
  }

  // clears all want items
  function clearWantItems() {
    let empty = true;
    want.forEach((item) => {
      if (item.isAdded) empty = false;
    });
    if (empty) return null;
    const want_focused = focuseOnCorrectField(false, Array(12).fill(BlankItem));
    setWant(want_focused);
  }

  function focuseOnCorrectField(h, w) {
    if (h && w) {
      let have_focused = [];
      let want_focused = [];
      let stop = false;

      h.forEach((item) => {
        if (item.isAdded || stop) item.isFocused = false;
        else {
          item.isFocused = true;
          stop = true;
        }

        have_focused.push(item);
      });

      w.forEach((item) => {
        if (item.isAdded || stop) item.isFocused = false;
        else {
          item.isFocused = true;
          stop = true;
        }

        want_focused.push(item);
      });

      return { have_focused, want_focused };
    } else if (h) {
      let have_focused = [];
      let temp = [];
      let stop = false;

      want.forEach((item) => {
        if (item.isFocused) item.isFocused = false;
        temp.push(item);
      });
      setWant(temp);

      h.forEach((item) => {
        if (item.isAdded || stop) item.isFocused = false;
        else {
          item.isFocused = true;
          stop = true;
        }

        have_focused.push(item);
      });

      return have_focused;
    } else if (w) {
      let want_focused = [];
      let temp = [];
      let stop = false;

      have.forEach((item) => {
        if (item.isFocused) item.isFocused = false;
        temp.push(item);
      });
      setHave(temp);

      w.forEach((item) => {
        if (item.isAdded || stop) item.isFocused = false;
        else {
          item.isFocused = true;
          stop = true;
        }

        want_focused.push(item);
      });

      return want_focused;
    }
  }

  // when editing a trade, this function gets trade response from the request and creates a ready context state for react to use
  function setTradeState(res) {
    let have_reform = [];
    let want_reform = [];

    have.forEach((item, i) => {
      if (res.data.trade.have[i]) {
        have_reform[i] = { ...item, ...res.data.trade.have[i] };
        have_reform[i].isAdded = true;
      } else have_reform[i] = item;
    });

    want.forEach((item, i) => {
      if (res.data.trade.want[i]) {
        want_reform[i] = { ...item, ...res.data.trade.want[i] };
        want_reform[i].isAdded = true;
      } else want_reform[i] = item;
    });

    const { have_focused, want_focused } = focuseOnCorrectField(
      have_reform,
      want_reform
    );

    setHave(have_focused);
    setWant(want_focused);
    setPlatform(res.data.trade.platform);
    setNotes(res.data.trade.notes);
  }
}

export { TradeContextProviderRL, TradeContextRL };
