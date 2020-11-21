import React, { useContext } from "react";

import { rl_dd_names } from "../../info/DropdownNames";
import { TbFiltersRLContext } from "../../context/TbFiltersRLContext";
import Dropdown from "../Dropdown";

const {
  gameDD,
  searchTypeDD,
  namesDD,
  colorDD,
  certDD,
  itemTypeDD,
  platformDD,
} = rl_dd_names;

function FiltersRL() {
  const {
    game,
    setGame,
    searchType,
    setSearchType,
    name,
    setName,
    color,
    setColor,
    cert,
    setCert,
    itemType,
    setItemType,
    platform,
    setPlatform,
    resetFilters,
  } = useContext(TbFiltersRLContext);

  return (
    <div className="filters-field hide">
      <Dropdown
        name={`Game`}
        value={game}
        items={gameDD}
        onChange={setGame}
      />
      <Dropdown
        name={`Search`}
        value={searchType}
        items={searchTypeDD}
        onChange={setSearchType}
      />
      <Dropdown
        name={`Name`}
        value={name}
        items={namesDD}
        onChange={setName}
      />
      <Dropdown
        name="Color"
        items={colorDD}
        onChange={setColor}
        value={color}
      />
      <Dropdown
        name={`Certification`}
        value={cert}
        items={certDD}
        onChange={setCert}
      />
      <Dropdown
        name={`Item Type`}
        value={itemType}
        items={itemTypeDD}
        onChange={setItemType}
      />
      <Dropdown
        name={`Platform`}
        value={platform}
        items={platformDD}
        onChange={setPlatform}
      />

      <div
        onClick={resetFilters}
        className="rl-resetFilters-button noUserInteraction"
      >
        <img
          src="/images/icons/trash.png"
          style={{ height: "14px", width: "14px" }}
          alt=""
        />
      </div>
    </div>
  );
}

export default FiltersRL;
