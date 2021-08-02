import React, { useState } from "react";

const PopupContext = React.createContext();

function PopupContextProvider({ children }) {
  const [openForm, setOpenForm] = useState(false);
  const [openTradeNotice, setOpenTradeNotice] = useState(false);
  const [openDeleteAllTrades, setOpenDeleteAllTrades] = useState(false);
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
  const [openEditTradePopup, setOpenEditTradePopup] = useState(false);
  const [openRepLeaderboards, setOpenRepLeaderboards] = useState(false);

  return (
    <PopupContext.Provider
      value={{
        openForm,
        setOpenForm,
        openTradeNotice,
        setOpenTradeNotice,
        openDeleteAllTrades,
        setOpenDeleteAllTrades,
        openLogoutPopup,
        setOpenLogoutPopup,
        openEditTradePopup,
        setOpenEditTradePopup,
        openRepLeaderboards,
        setOpenRepLeaderboards
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}

export { PopupContextProvider, PopupContext };
