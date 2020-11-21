import React, { useState, useEffect, useRef } from 'react'

export default function Dropdown({ name, items, onChange, defaultValue, ...props }) {
    const [state, setState] = useState({
        open: false,
        selected: defaultValue || 0,
        search: "",
        visibleItems: []
    })
    const { open, selected, search, visibleItems } = state;
    const ref = useRef();
    useEffect(() => {
        const term = state.search.toLowerCase().trim();
        setState({
            ...state,
            visibleItems: items
                .map((value, index) => ({ value, index }))
                .filter(i => i.value.toLowerCase().search(term) > -1)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, items])

    //When Selected Value Changes
    useEffect(() => {
        onChange(items[selected]/*{ index: selected, value: items[selected] }*/)
    }, [selected, items, onChange])

    //Detect Clicks
    function onClick(e) {
        if (!ref.current.contains(e.target)) setState({ ...state, open: false })
    }
    useEffect(() => {
        window.addEventListener("click", onClick)
        return () => {
            window.removeEventListener("click", onClick)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(state)
    return (
        <div className="filterButtonWrapper" {...props} ref={ref}>
            <label className="filter-label">{name || "Dropdown"}</label>
            <div
                onClick={() => setState({ ...state, open: !open })}
                className={`noUserInteraction filterButton ${open ? "blackBorder" : null}`}
            >
                <div className="filterButtonContent">
                    <p id="fix">{items[selected]}</p>
                </div>
                <div className={`${open ? "openArrow" : "dropdownArrow"}`}></div>
            </div>
            {/* Dropdown Content */}
            {open && <div className="dropdown">
                <input
                    id="dd"
                    onChange={e => setState({ ...state, search: e.target.value })}
                    placeholder="Search"
                    className="filterInput"
                ></input>
                <div className="itemNames">
                    {visibleItems.map(item => (
                        <div
                            className="menu-item"
                            onClick={() => setState({ ...state, selected: item.index })}
                            key={item.index}
                        >
                            {item.value}
                        </div>
                    ))}
                </div>
            </div>
            }
        </div>
    )
};