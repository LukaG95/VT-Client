import React, { useState } from "react";
import { ItemTypes } from "../../constants/Items";
import { useTradeFilters } from "../../context/TradeFiltersContext";
import useWindowDimensions from "../../misc/windowHW";

function FilterBar() {
  const [filters, dispatch] = useTradeFilters();
  const [openFilters, setOpenFilters] = useState(false);

  const { width } = useWindowDimensions();

  if (width >= 1778 && openFilters === true) setOpenFilters(false);

  return (
    <div className="choose-itemsSearchFiltersRL">
      <div className="initial-filter-header-addTrade">
        <div className="magnGlass-container">
          <img
            style={{ width: "11px", height: "11px", marginLeft: "2px" }}
            src="/images/icons/search.png"
            alt=""
          />
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
        {width >= 1778 ? (
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
              <img
                className="filter-filter-icon"
                src="/images/icons/filter.png"
                alt=""
              />
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
              alt={type.type}
              style={
                filters.type === type.type ? { filter: "brightness(1)" } : null
              }
            />
          </button>
        ))}
      </section>
    );
  }
}

export default FilterBar;
