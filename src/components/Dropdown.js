import React, { useState, useEffect, useRef } from 'react'
import styles from "./Dropdown.module.scss";

export default function Dropdown({ name, items, onChange, value, ...props }) {
    const [state, setState] = useState({
        open: false,
        search: "",
        visibleItems: items
    })
    const { open, search, visibleItems } = state;
    const ref = useRef();
    useEffect(() => {
        const term = state.search.toLowerCase().trim();
        setState({
            ...state,
            visibleItems: term ? items.filter(i => i.toLowerCase().search(term) > -1) : items
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, items])
    //Detect Clicks
    function onClick(e) {
        if (!ref.current || !ref.current.contains(e.target)) setState({ ...state, open: false })
    }
    useEffect(() => {
        window.addEventListener("click", onClick)
        return () => {
            window.removeEventListener("click", onClick)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className={styles.wrapper} {...props} ref={ref}>
            <label className={styles.label}>{name || "Dropdown"}</label>
            <div
                onClick={() => setState({ ...state, open: !open })}
                className={`${styles.button} ${open ? styles.open : ""}`}
            >
                <div className={styles.content}>
                    <span>{value}</span>
                </div>
                <div className={`${styles.arrow} ${open ? styles.open : ""}`}></div>
            </div>
            {/* Dropdown Content */}
            {open && <div className={styles.dropdown}>
                <input
                    onChange={e => setState({ ...state, search: e.target.value })}
                    placeholder="Search"
                    className={styles.search}
                ></input>
                <div className={styles.items}>
                    {visibleItems.map((item, index) => (
                        <div
                            className={styles.item}
                            onClick={() => {
                                if (item !== value && onChange) onChange(item)
                                setState({ ...state, open: false})
                            }}
                            key={index}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            }
        </div>
    )
};