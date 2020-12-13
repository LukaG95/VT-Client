import React, { useEffect } from "react";
import ArrowUpIcon from "../images/icons/arrow-up.png";

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
      <img height={30} width={30} src={ArrowUpIcon} alt="" />
    </div>
  );
};

export default ScrollUpButton;
