import React from "react";

function imageExists(url, itemID) {
  let x = null;
  try {
    try {
      x = <img src={require(`../images/RLimages/${url}`)} />;
      return require(`../images/RLimages/${url}`);
    } catch {
      x = <img src={require(`../images/RLimages/${itemID}.0.webp`)} />;
      return require(`../images/RLimages/${itemID}.0.webp`);
    }
  } catch {
    return require("../images/RLimages/question.png");
  }
}

export default imageExists;
