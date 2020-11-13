import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { App } from "./App";
import { UserContextProvider } from "./context/UserContext";
import { PopupContextProvider } from "./context/PopupContext";
import { TbFiltersRLContextProvider } from "./context/TbFiltersRLContext";

import "./css/styles.css";
import "./css/animations.css";
import "./css/template.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <UserContextProvider>
    <PopupContextProvider>
      <TbFiltersRLContextProvider>
        <Router>
          <App />
        </Router>
      </TbFiltersRLContextProvider>
    </PopupContextProvider>
  </UserContextProvider>,
  document.getElementById("root")
);
