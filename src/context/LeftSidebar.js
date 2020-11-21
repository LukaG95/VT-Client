import React, { useState } from "react";

const LeftSidebarContext = React.createContext();

function LeftSidebarContextProvider({ children }) {
  const [isOpen_LeftSidebar, setIsOpen_LeftSidebar] = useState(false);

  return (
    <LeftSidebarContext.Provider
      value={{
        isOpen_LeftSidebar,
        setIsOpen_LeftSidebar,
      }}
    >
      {children}
    </LeftSidebarContext.Provider>
  );
}

export { LeftSidebarContextProvider, LeftSidebarContext };
