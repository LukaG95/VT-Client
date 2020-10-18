import React, {useState} from 'react'

const PopupContext = React.createContext()

function PopupContextProvider({children}) {
  const [openForm, setOpenForm] = useState(false)
  const [openTradeNotice, setOpenTradeNotice] = useState(false)
  const [openDeleteAllTrades, setOpenDeleteAllTrades] = useState(false)

  return (
      <PopupContext.Provider value={{openForm, setOpenForm, openTradeNotice, setOpenTradeNotice, openDeleteAllTrades, setOpenDeleteAllTrades}}>
          {children}
      </PopupContext.Provider>
  )
}

export {PopupContextProvider, PopupContext}