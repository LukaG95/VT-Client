import React from "react";

export default function Placeholder({ item }) {
  return (
    <div className="RLicon noUserInteraction">
      <img
        style={{
          height: "auto",
          minHeight: "90px",
          width: "100%",
          maxWidth: "130px",
          borderRadius: "5px 5px 0px 0px",
        }}
        src="images/icons/question.png"
        alt=""
      />

      <div className="RLicon-name">{item.Name}</div>
    </div>
  );
}

// this is close, try some Img including or some height setting
