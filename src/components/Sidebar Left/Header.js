import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { closeSidebar } from "../../misc/manageSidebar";
import { LeftSidebarContext } from "../../context/LeftSidebar";
import { UserContext } from "../../context/UserContext";

function Header() {
  const [openHeader, setOpenHeader] = useState(false);
  const [headerSelection, setHeaderSelection] = useState("Trading");
  const [allOptions] = useState([
    { path: "/", name: "Trading" },
    { path: "/reputation", name: "Reputation" },
    { path: "/account/settings", name: "My Account" },
  ]);

  const { isLoggedIn } = useContext(UserContext);
  const { setIsOpen_LeftSidebar } = useContext(
    LeftSidebarContext
  );

  const path = useLocation().pathname;

  useEffect(() => {
    if (path === "/reputation") setHeaderSelection("Reputation");
    else if (path === "/" || path === "/trading/rl")
      setHeaderSelection("Trading");
    else if (
      path === "/account/settings" ||
      path === "/account/messages" ||
      path === "/account/premium"
    )
      setHeaderSelection("My Account");
  }, [path]);

  return (
    <div className="sidebar-header">
      <div className="sidebar-header-initial">
        {openHeader ? (
          <span onClick={() => setOpenHeader(false)} id="arrow_up">
            <img
              height={20}
              width={20}
              src={require("../../images/other/arrow_up_sidebar.png")}
              alt=""
            />
          </span>
        ) : (
          <span
            onClick={() => {
              setOpenHeader(false);
              closeSidebar();
              setIsOpen_LeftSidebar(false);
            }}
            id="x"
          >
            &#xd7;
          </span>
        )}

        <div
          onMouseEnter={() =>
            (document.getElementById("paint-arrow").style.background =
              "#fe3b3b")
          }
          onMouseLeave={() =>
            (document.getElementById("paint-arrow").style.background =
              "#f6f6f6")
          }
          onClick={() => setOpenHeader(!openHeader)}
          className="header-selection"
        >
          {headerSelection}
          <div
            id="paint-arrow"
            style={{ marginLeft: "5px" }}
            className={`${openHeader ? "openArrow" : "dropdownArrow"}`}
          ></div>
        </div>
      </div>

      {headerDropdown()}
    </div>
  );

  function headerDropdown() {
    const dropdown = allOptions.map((option) => {
      if (option.name === "My Account" && !isLoggedIn) return null;
      if (option.name !== headerSelection)
        return (
          <div
            onClick={() => {
              setOpenHeader(false);
              closeSidebar();
              setIsOpen_LeftSidebar(false);
            }}
            className="header-selection-dropdown"
            style={openHeader ? { height: "60px" } : { height: "0px" }}
          >
            <Link to={option.path} className="sidebar-header-dropdownLINK">
              {option.name}
            </Link>
          </div>
        );
        else return null
    });

    return dropdown;
  }
}

export default Header;
