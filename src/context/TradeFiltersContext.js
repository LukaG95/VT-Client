import * as React from 'react'
import { Games } from '../constants/Games'

const TradeFiltersStateContext = React.createContext()
const TradeFiltersDispatchContext = React.createContext()

const defaultState = {
    game: Games.ROCKET_LEAGUE,
    search: "I want to buy",
    name: "",
    color: "Any",
    cert: "Any",
    type: "Any",
    platform: "Any",
}

function tradeFiltersReducer(state, action) {
    switch (action.type) {
        case 'setFilter': {
            const type = action.payload.type // "game", "search", "name"...
            return { ...state, [type]: action.payload.value }
        }
        case 'reset': {
            return { ...defaultState };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function TradeFiltersProvider({ children }) {
    const [state, dispatch] = React.useReducer(tradeFiltersReducer, defaultState)
    return (
        <TradeFiltersStateContext.Provider value={state}>
            <TradeFiltersDispatchContext.Provider value={dispatch}>
                {children}
            </TradeFiltersDispatchContext.Provider>
        </TradeFiltersStateContext.Provider>
    )
}

function useTradeFiltersState() {
    const context = React.useContext(TradeFiltersStateContext)
    if (context === undefined) {
        throw new Error('useTradeFiltersState must be used within a TradeFiltersProvider')
    }
    return context
}

function useTradeFiltersDispatch() {
    const context = React.useContext(TradeFiltersDispatchContext)
    if (context === undefined) {
        throw new Error('useTradeFiltersDispatch must be used within a TradeFiltersProvider')
    }
    return context
}

function useTradeFilters() {
    return [useTradeFiltersState(), useTradeFiltersDispatch()]
}

export { TradeFiltersProvider, useTradeFilters }