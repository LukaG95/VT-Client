import React, {useContext, useState} from 'react'

const TradeContext = React.createContext()

function TradeContextProvider({children}) {
  const [have, setHave] = useState([
    {id: 1, url: "", isFocused: true, color: "none", cert: "none", amount: 1}, 
    {id: 2, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 3, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 4, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 5, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 6, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 7, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 8, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 9, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 10, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 11, url: "", isFocused: false, color: "none", cert: "none", amount: 1},  
    {id: 12, url: "", isFocused: false, color: "none", cert: "none", amount: 1}
  ])

  const [want, setWant] = useState([
    {id: 13, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 14, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 15, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 16, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 17, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 18, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 19, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 20, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 21, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 22, url: "", isFocused: false, color: "none", cert: "none", amount: 1}, 
    {id: 23, url: "", isFocused: false, color: "none", cert: "none", amount: 1},  
    {id: 24, url: "", isFocused: false, color: "none", cert: "none", amount: 1}
  ])

  const [notes, setNotes] = useState("")
  const [platform, setPlatform] = useState("Steam")

  return (
    <TradeContext.Provider value={{have, setHave, want, setWant}}>
      {children}
    </TradeContext.Provider>
  )
}

export {TradeContextProvider, TradeContext};
