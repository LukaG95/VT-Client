import React, {useState} from 'react'

const PopupContext = React.createContext()

function PopupContextProvider({children}) {
  const [openForm, setOpenForm] = useState(false)
  const [openTradeNotice, setOpenTradeNotice] = useState(false)
  const [openDeleteAllTrades, setOpenDeleteAllTrades] = useState(false)
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false)

  return (
      <PopupContext.Provider value={{openForm, setOpenForm, openTradeNotice, setOpenTradeNotice, openDeleteAllTrades, setOpenDeleteAllTrades, openLogoutPopup, setOpenLogoutPopup}}>
          {children}
      </PopupContext.Provider>
  )
}

export {PopupContextProvider, PopupContext}