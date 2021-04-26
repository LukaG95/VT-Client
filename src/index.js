import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { UserContextProvider } from "./context/UserContext";
import { PopupContextProvider } from "./context/PopupContext";
import { TbFiltersRLContextProvider } from "./context/TbFiltersRLContext";
import { LeftSidebarContextProvider } from "./context/LeftSidebar";

import "./css/styles.css";
import "./css/animations.css";
import "./css/template.css";
import "react-toastify/dist/ReactToastify.css";

<<<<<<< HEAD
// import ReactGA from 'react-ga';
// ReactGA.initialize('G-GW7F7H0NST');
=======
import ReactGA from 'react-ga';
ReactGA.initialize('G-GW7F7H0NST');
>>>>>>> f517daee126c42b8f322440754e77342fabb4084

ReactDOM.render(
  <UserContextProvider>
    <PopupContextProvider>
      <TbFiltersRLContextProvider>
        <LeftSidebarContextProvider>
          <Router>
            <App />
          </Router>
        </LeftSidebarContextProvider>
      </TbFiltersRLContextProvider>
    </PopupContextProvider>
  </UserContextProvider>,
  document.getElementById("root")
);
