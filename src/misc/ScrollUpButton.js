import React, { useEffect } from "react";
import { ReactComponent as ArrowUpIcon } from "../images/icons/arrow up dark.svg";

const ScrollUpButton = () => {
  useEffect(() => {
    const toTop = document.querySelector(".to-top");

    if (toTop)
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          toTop.classList.add("active");
        } else {
          toTop.classList.remove("active");
        }
      });

    return window.removeEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        toTop.classList.add("active");
      } else {
        toTop.classList.remove("active");
      }
    });
  });

  return (
    <div
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      className="to-top"
    >
      <ArrowUpIcon style={{width: "30px", height: "30px"}} />
    </div>
  );
};

export default ScrollUpButton;
