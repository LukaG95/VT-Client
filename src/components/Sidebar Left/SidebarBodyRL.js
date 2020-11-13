import React, {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'

function SidebarBodyRL(){

  return(
    <div className="sidebar-body">
      <div className="sidebar-filters-rl">
        <FilterButton text={"Game"} value={game} dd={gameDD} setFunction={setGame} id={1}/>
        <FilterButton text={"Search"} value={searchType} dd={searchTypeDD} setFunction={setSearchType} id={2}/>
        <FilterButton text={"Name"} value={name} dd={namesDD} setFunction={setName} id={3}/>
        <FilterButton text={"Color"} value={color} dd={colorDD} setFunction={setColor} id={4}/>
        <FilterButton text={"Certification"} value={cert} dd={certDD} setFunction={setCert} id={5}/> 
        <FilterButton text={"Item Type"} value={itemType} dd={itemTypeDD} setFunction={setItemType} id={6}/>
        <FilterButton text={"Platform"} value={platform} dd={platformDD} setFunction={setPlatform} id={7}/>
      </div>

      <div onClick={()=> {closeSidebar(); setIsOpen_LeftSidebar(false)}} className="sidebar-reset-filters-button">Confirm filters</div>

      <div onClick={()=> resetFilters()} className="sidebar-reset-filters-button">Reset filters</div>

      <div className="separator-horizontal"></div>

      <SidebarFooter />

    </div>
  )

}

export default SidebarBodyRL