import React, { useState } from "react";

import { ItemTypes } from "../../constants/Items";
import { useTradeFilters } from "../../context/TradeFiltersContext";
import useWindowDimensions from "../../misc/windowHW";
import { ReactComponent as MagnifyingGlass } from "../../images/icons/magnifying glass.svg";
import { ReactComponent as FilterIcon } from "../../images/icons/filter.svg";

function FilterBar() {
  const [filters, dispatch] = useTradeFilters();
  const [openFilters, setOpenFilters] = useState(false);

  const { width } = useWindowDimensions();

  if (width >= 1778 && openFilters === true) setOpenFilters(false);

  return (
    <div className="choose-itemsSearchFiltersRL">
      <div className="initial-filter-header-addTrade">
        <div className="magnGlass-container">
          <MagnifyingGlass style={{ width: "15px", height: "15px", marginLeft: "2px" }} />
        </div>
        <input
          placeholder="Search items..."
          onChange={(e) => {
            if (e.target.value !== filters.name)
              dispatch({
                type: "setFilter",
                payload: {
                  type: "name",
                  value: e.target.value.toLowerCase(),
                },
              });
          }}
        />
        {width >= 1785 ? (
          filterButtons()
        ) : (
          <div className="rl-filters-small-width">
            <div
              className="sigh"
              style={
                filters.tyoe === "Filter" ? { filter: "brightness(1)" } : null
              }
              onClick={() => setOpenFilters(!openFilters)}
            >
              <FilterIcon className="filter-filter-icon"/>
              <div
                style={{ alignSelf: "flex-end" }}
                className="dropdownArrow"
              ></div>
            </div>
          </div>
        )}
      </div>
      <div
        className="rl-filters-dropdown-addTrade"
        style={
          openFilters
            ? { height: "60px", marginTop: "12px" }
            : { height: "0px" }
        }
      >
        {filterButtons()}
      </div>
    </div>
  );
  function filterButtons() {
    return (
      <section className="RLfilter_icons_section">
        {ItemTypes.map((type) => (
          <div className="RLfilter_iconWrapper">
            <button
              key={type.type}
              onClick={() =>
                dispatch({
                  type: "setFilter",
                  payload: {
                    type: "type",
                    value: type.type,
                  },
                })
              }
            >
              <img
                className="RLfilter_icon"
                src={type.image}
                alt=""
                style={filters.type === type.type ? { filter: "brightness(1)" } : null}
              />
            </button>
            {width >= 1785 && <span>{type.type}</span>}
          </div>
        ))}
      </section>
    );
  }
}

export default FilterBar;
