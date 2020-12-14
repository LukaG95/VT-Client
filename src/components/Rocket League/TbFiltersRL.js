import React, { useContext } from "react";

import { rl_dd_names } from "../../info/DropdownNames";
import { TbFiltersRLContext } from "../../context/TbFiltersRLContext";
import Dropdown from "../Dropdown";
import styles from "./TbFiltersRL.module.scss";
import ClearItems from "../AddTrade/ClearItems";

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
        className={styles.dropdown}
      />
      <Dropdown
        name={`Search`}
        value={searchType}
        items={searchTypeDD}
        onChange={setSearchType}
        className={styles.dropdown}
      />
      <Dropdown
        name={`Name`}
        value={name}
        items={namesDD}
        onChange={setName}
        className={styles.dropdown}
      />
      <Dropdown
        name="Color"
        items={colorDD}
        onChange={setColor}
        value={color}
        className={styles.dropdown}
      />
      <Dropdown
        name={`Certification`}
        value={cert}
        items={certDD}
        onChange={setCert}
        className={styles.dropdown}
      />
      <Dropdown
        name={`Item Type`}
        value={itemType}
        items={itemTypeDD}
        onChange={setItemType}
        className={styles.dropdown}
      />
      <Dropdown
        name={`Platform`}
        value={platform}
        items={platformDD}
        onChange={setPlatform}
        className={styles.dropdown}
      />
      <ClearItems onClick={resetFilters} className={styles.clear} />
    </div>
  );
}

export default FiltersRL;
