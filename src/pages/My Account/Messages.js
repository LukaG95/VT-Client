import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Filter from "bad-words";

import Topbar from "./Topbar";
import { UserContext } from "../../context/UserContext";
import { createNotification } from "../../misc/ToastNotification";

function Messages() {

   useEffect(() => {

  }, []);

  return (
    <>
      <Topbar />
    </>
  );
}

export default Messages;
