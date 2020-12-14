import * as React from "react";
import { Platforms } from "../constants/Platforms";
import { DefaultItem } from "../constants/Items";

const TradeStateContext = React.createContext();
const TradeDispatchContext = React.createContext();

const defaultState = {
  have: Array(12).fill(null),
  want: Array(12).fill(null),
  platform: Platforms.STEAM,
  notes: "",
  count: 0,
  selected: {
    type: "have",
    index: 0
  }
};

export const actions = {
  SET_NOTES: "SET_NOTES",
  SET_PLATFORM: "SET_PLATFORM",
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_ITEM: "UPDATE_ITEM",
  SET_SELECTED: "SET_SELECTED",
  SET_TYPE: "SET_TYPE",
  SET_ITEMS: "SET_ITEMS",
  CLEAR_ITEMS: "CLEAR_ITEMS",
  ADD_TRADE: "ADD_TRADE",
  REMOVE_TRADE: "REMOVE_TRADE",
  RESET: "RESET"
}

function tradeReducer(state, action) {
  switch (action.type) {
    case actions.SET_NOTES: {
      return { ...state, notes: action.payload };
    }
    case actions.SET_PLATFORM: {
      return { ...state, platform: action.payload };
    }
    case actions.ADD_ITEM: {
      const type = state.selected.type; // "have" or "want"
      const index = state.selected.index;
      //If item in slot already, return
      if (state[type][index]) return state;
      let selected = { ...state.selected }
      //Find first empty after index
      const after = state[type].slice(index + 1, 12).findIndex(item => !item)
      if (after > -1) {
        selected.index = after + index + 1
      } else {
        //If none empty after, check other section
        const altType = type === "have" ? "want" : "have"
        const otherSection = state[altType].findIndex(item => !item)
        if (otherSection > -1) {
          selected.type = altType
          selected.index = otherSection
        } else {
          //If none in other section, find empty before
          const before = state[type].slice(0, index).findIndex(item => !item)
          selected.index = before
        }
      }
      return {
        ...state,
        [type]: [
          ...state[type].slice(0, index),
          { ...Object.assign(DefaultItem, action.payload) },
          ...state[type].slice(index + 1, 12)
        ].slice(0, 12),
        selected
      };
    }
    case actions.SET_TYPE: {
      const type = action.payload
      if (state.selected.type === type) return state;
      const index = state[type].findIndex(item => !item)
      return {
        ...state,
        selected: {
          type,
          index: index > -1 ? index : 0
        }
      }
    }
    case actions.REMOVE_ITEM: {
      const type = action.payload.type; // "have" or "want"
      const index = action.payload.index;
      return {
        ...state,
        [type]: [
          ...state[type].slice(0, index),
          null,
          ...state[type].slice(index + 1, 12),
        ],
        selected: {
          type,
          index
        }
      };
    }
    case actions.UPDATE_ITEM: {
      const type = action.payload.type; // "have" or "want"
      const index = action.payload.index;
      return {
        ...state,
        [type]: [
          ...state[type].slice(0, index),
          Object.assign(state[type][index], action.payload.item),
          ...state[type].slice(index + 1, 12),
        ],
      };
    }
    case actions.SET_SELECTED: {
      return { ...state, selected: action.payload };
    }
    case actions.SET_ITEMS: {
      return { ...state, ...action.payload };
    }
    case actions.CLEAR_ITEMS: {
      const type = action.payload; // "have" or "want"
      return {
        ...state,
        [type]: Array(12).fill(null),
        selected: {
          type,
          index: 0
        }
      };
    }
    case actions.ADD_TRADE: {
      return { ...state, count: state.count + 1 };
    }
    case actions.REMOVE_TRADE: {
      return { ...state, count: state.count - 1 };
    }
    case actions.RESET: {
      return { ...defaultState, platform: state.platform, count: state.count };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function TradeProvider({ children }) {
  const [state, dispatch] = React.useReducer(tradeReducer, defaultState);
  return (
    <TradeStateContext.Provider value={state}>
      <TradeDispatchContext.Provider value={dispatch}>
        {children}
      </TradeDispatchContext.Provider>
    </TradeStateContext.Provider>
  );
}

function useTradeState() {
  const context = React.useContext(TradeStateContext);
  if (context === undefined) {
    throw new Error("useTradeState must be used within a TradeProvider");
  }
  return context;
}

function useTradeDispatch() {
  const context = React.useContext(TradeDispatchContext);
  if (context === undefined) {
    throw new Error("useTradeDispatch must be used within a TradeProvider");
  }
  return context;
}

function useTrade() {
  return [useTradeState(), useTradeDispatch()];
}

export { TradeProvider, useTrade };
