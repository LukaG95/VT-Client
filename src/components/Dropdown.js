import React, { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.scss";

export default function Dropdown({ name, items, onChange, value, light, floating, ...props }) {
  const [state, setState] = useState({
    // open: false,
    search: "",
    visibleItems: items,
  });
  /* separate state for opened, there was a bug when closing the dropdown when clicking outside on the AddRep page (the state didn't update for some reason) */
  const [open, setOpen] = useState(false)

  const { search, visibleItems } = state;
  const ref = useRef();

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
    if (!ref.current || !ref.current.contains(e.target)){
      setState({ ...state, search: ""});
      setOpen(false)
    }
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
      style={floating && open ? { transform: `translateY(${floating})`, zIndex: 3} : {}}
      ref={ref}
    >
      <label onClick={() => {if (floating) {setState({ ...state, search: ""  }); setOpen(!open)}}} className={styles.label}>{name || "Dropdown"}</label>
      <div
        onClick={() => {setState({ ...state, search: ""  }); setOpen(!open)}}
        className={`${styles.button} ${open ? styles.open : ""}`}
      >
          
        <div className={styles.content} style={!floating && open ? {paddingBottom: "1px"} : null}>
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
           
                  if (item !== value && onChange) 
                    onChange(item)
                    
                  setState({ ...state, search: ""  })
                  setOpen(!open)
                }}
                key={index}
              >
                {item}
                {item === "CSGO" || item === "Keys And Currency" ? <p>coming soon</p> : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
