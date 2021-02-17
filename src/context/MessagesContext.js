import React, { useState } from "react";

const MessagesContext = React.createContext();

function MessagesContextProvider({ children }) {
  const [openForm, setOpenForm] = useState(false);

  return (
    <MessagesContext.Provider
      value={{
        openForm
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export { MessagesContextProvider, MessagesContext };
