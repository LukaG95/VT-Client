import React, { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.scss";

export default function Dropdown({ name, items, onChange, value, light, floating, ...props }) {
  const [state, setState] = useState({
    open: false,
    search: "",
    visibleItems: items,
  });
  
  const { open, search, visibleItems } = state;
  const ref = useRef();

  // when we close dropdown set search to ""
  useEffect(() => {
    const term = state.search.toLowerCase().trim();
    setState({
      ...state,
      visibleItems: term
        ? items.filter((i) => i.toLowerCase().search(term) > -1)
        : items,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, items]);

  //Detect Clicks
  function onClick(e) {
    if (!ref.current || !ref.current.contains(e.target))
      setState({ ...state, open: false, search: "" });
  }

  useEffect(() => {
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      {...props}
      className={[styles.wrapper, light ? styles.light : "", floating ? styles.floating : "", props.className || ""].join(" ")}
      style={floating && open ? { transform: `translateY(${floating})`, zIndex: 5} : {}}
      ref={ref}
    >
      <label onClick={() => {floating && setState({ ...state, open: !open })}} className={styles.label}>{name || "Dropdown"}</label>
      <div
        onClick={() => setState({ ...state, open: !open, search: "" })}
        className={`${styles.button} ${open ? styles.open : ""}`}
      >
          
        <div className={styles.content}>
          <span>{value}</span>
        </div>

        <div className={`${styles.arrow} ${open ? styles.open : ""}`}></div>
      </div>

      {/* Dropdown Content */}
      {open && (
        <div className={styles.dropdown} style={floating ? {animation: "transitionFade 0.5s"} : {}}> 

          <input
            onChange={(e) => setState({ ...state, search: e.target.value})}
            placeholder="Search"
            className={styles.search}
            autoFocus
          />
          <div className={styles.items}>
            {visibleItems.map((item, index) => (
              <div
                data-type="dropdown-item"
                className={styles.item}
                onClick={() => {
           
                  if (item !== value && onChange) onChange(item);
                  setState({ ...state, open: false });
                }}
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
