import React, { useContext } from "react";

import { viewSidebar } from "../../misc/manageSidebar";
import { LeftSidebarContext } from "../../context/LeftSidebar";

function Hamburber() {
  const { setIsOpen_LeftSidebar } = useContext(LeftSidebarContext);

  return (
    <div
      onClick={() => {
        viewSidebar();
        setIsOpen_LeftSidebar(true);
      }}
      className="hamburger_wrapper"
    >
      <div className="hamburger">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Hamburber;
