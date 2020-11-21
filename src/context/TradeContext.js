import * as React from "react";
import { Platforms } from "../constants/Platforms";
import { DefaultItem } from "../constants/Items";

const TradeStateContext = React.createContext();
const TradeDispatchContext = React.createContext();

const defaultState = {
  have: [],
  want: [],
  platform: Platforms.STEAM,
  notes: "",
  count: 0,
};

function tradeReducer(state, action) {
  switch (action.type) {
    case "setNotes": {
      return { ...state, notes: action.payload };
    }
    case "setPlatform": {
      return { ...state, platform: action.payload };
    }
    case "addItem": {
      const type = action.payload.type; // "have" or "want"
      return {
        ...state,
        [type]: [...state[type], { ...Object.assign(DefaultItem, action.payload.item) }].slice(0, 12),
      };
    }
    case "setItems": {
      return { ...state, ...action.payload };
    }
    case "clearItems": {
      const type = action.payload; // "have" or "want"
      return { ...state, [type]: [] };
    }
    case "addTrade": {
      return { ...state, count: state.count + 1 };
    }
    case "removeTrade": {
      return { ...state, count: state.count - 1 };
    }
    case "reset": {
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
