import React, {useContext, useState} from 'react'

import {TradeContextRL} from '../../context/TradeContextRL'
import infoRL from '../../info/infoRL.json' 
import imageExists from '../../misc/imageExists'
import useWindowDimensions from '../../misc/windowHW'

function AddTradeFiltersRL({setItemImages, setTradeErrorMsg}) {
  const [currentFilter, setCurrentFilter] = useState("All")
  const [openFilters, setOpenFilters] = useState(false)

  const {pushItem} = useContext(TradeContextRL)

  const { width } = useWindowDimensions()

  if (width >= 1778 && openFilters === true)
    setOpenFilters(false)
  
	return (
    <div className="choose-itemsSearchFiltersRL">

      <div className="initial-filter-header-addTrade">

        <div className="magnGlass-container"><img style={{width: "11px", height: "11px", marginLeft: "2px"}} src={require("../../images/other/MagnGlass.png")} alt=""/></div>

        <input 
          onChange={e=> {
            let thumbnails = []
            infoRL.Slots.map(Slot => Slot.Items.forEach(item => {
              if (item.Tradable && item.Name.toLowerCase().includes(e.target.value.toLowerCase())) 
                thumbnails.push(
                  <div className="RLicon noUserInteraction">
                    <img 
                      loading="lazy"
                      style={{height: "auto", minHeight: "95px", width: "100%", maxWidth: "105px", cursor: "pointer", borderRadius: "5px 5px 0px 0px"}} 
                      src={imageExists(`${item.ItemID}.0.webp`)}
                      onClick={() => {setTradeErrorMsg(""); pushItem(item)}} 
                      alt=""
                    />
                    <div onClick={() => {setTradeErrorMsg(""); pushItem(item)}} className="RLicon-name">{item.Name}</div>
                  </div>
                )
            }))
            setItemImages(thumbnails)
          }}
          placeholder="Search items..."
        >
        </input>

        {
          width >=1778 ? 
            filterButtons()
          : 
            <div className="rl-filters-small-width">	
              <div className="sigh" style={currentFilter === "Filter" ? {filter: "brightness(1)"} : null} onClick={()=> setOpenFilters(!openFilters)}>
                <img className="filter-filter-icon" src={require(`../../images/other/filter.png`)} alt="" />
                <div style={{alignSelf: "flex-end"}} className="dropdownArrow"></div>
              </div>
            </div>
        }

      </div>

      <div 
        className="rl-filters-dropdown-addTrade"
        style={openFilters ? {height: "60px", marginTop: "12px"} : {height: "0px"}}
      >
        {filterButtons()}
      </div> 

    </div>

  )

  /*-----Functions                -------------*/

  function setNames(type){
    if (type === "All"){
      let thumbnails = []
      infoRL.Slots.map(Slot => Slot.Items.forEach(item => {
        item.Tradable && thumbnails.push(
          <div className="RLicon noUserInteraction">
            <img 
              loading="lazy"
              style={{height: "auto", minHeight: "95px", width: "100%", maxWidth: "105px", cursor: "pointer", borderRadius: "5px 5px 0px 0px"}} 
              src={imageExists(`${item.ItemID}.0.webp`)}
              onClick={() => {setTradeErrorMsg(""); pushItem(item)}} 
              alt=""
            />
            <div onClick={() => {setTradeErrorMsg(""); pushItem(item)}} className="RLicon-name">{item.Name}</div>
          </div>
        )
      }))
      setItemImages(thumbnails)

    }
    else{
      let thumbnails = []
      infoRL.Slots.map(Slot => Slot.Name === type && Slot.Items.forEach(item => {
        item.Tradable && thumbnails.push(
          <div className="RLicon noUserInteraction">
            <img 
              loading="lazy"
              style={{height: "auto", minHeight: "95px", width: "100%", maxWidth: "105px", cursor: "pointer", borderRadius: "5px 5px 0px 0px"}} 
              src={imageExists(`${item.ItemID}.0.webp`)}
              onClick={() => {setTradeErrorMsg(""); pushItem(item)}} 
              alt=""
            />
            <div onClick={() => {setTradeErrorMsg(""); pushItem(item)}} className="RLicon-name">{item.Name}</div>
          </div>
        )
      }))
      setItemImages(thumbnails)
   }
  }

  function filterButtons(){
    return(
      <section className="RLfilter_icons_section">		
        <button onClick={()=> {setCurrentFilter("All"); setNames("All")}}><img className="RLfilter_icon" src={require(`../../images/rl_filter_icons/Transparent/All.png`)} alt="" style={currentFilter === "All" ? {filter: "brightness(1)"} : null} /></button>
        <button onClick={()=> {setCurrentFilter("Blueprint"); setNames("Blueprint")}}><img className="RLfilter_icon" src={require(`../../images/rl_filter_icons/Transparent/Blueprints.png`)} alt="" style={currentFilter === "Blueprint" ? {filter: "brightness(1)"} : null} /></button>
        <button onClick={()=> {setCurrentFilter("Crate"); setNames("Crate")}}><img className="RLfilter_icon" src={require(`../../images/rl_filter_icons/Transparent/Gift_Packs.png`)} alt="" style={currentFilter === "Crate" ? {filter: "brightness(1)"} : null} /></button>
        <button onClick={()=> {setCurrentFilter("Body"); setNames("Body")}}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Bodies.png")} alt="" style={currentFilter === "Body" ? {filter: "brightness(1)"} : null} /></button>
        <button onClick={()=> {setCurrentFilter("Decal"); setNames("Decal")}}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Decals.png")} alt="" style={currentFilter === "Decal" ? {filter: "brightness(1)"} : null} /></button>
        <button onClick={()=> {setCurrentFilter("Paint Finish"); setNames("Paint Finish")}}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Paint_Finishes.png")} alt="" style={currentFilter === "Paint Finish" ? {filter: "brightness(1)"} : null} /></button>
        <button onClick={()=> {setCurrentFilter("Wheels"); setNames("Wheels")}}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Wheels.png")} alt="" style={currentFilter === "Wheels" ? {filter: "brightness(1)"} : null} /></button>
        <button onClick={()=> {setCurrentFilter("Rocket Boost"); setNames("Rocket Boost")}}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Boosts.png")} alt="" style={currentFilter === "Rocket Boost" ? {filter: "brightness(1)"} : null} /></button>
        <button onClick={()=> {setCurrentFilter("Topper"); setNames("Topper")}}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Toppers.png")} alt="" style={currentFilter === "Topper" ? {filter: "brightness(1)"} : null} /></button>
        <button onClick={()=> {setCurrentFilter("Antenna"); setNames("Antenna")}}><img className="RLfilter_icon" src={require(`../../images/rl_filter_icons/Transparent/Antennas.png`)} alt="" style={currentFilter === "Antenna" ? {filter: "brightness(1)"} : null} /></button>
        <button onClick={()=> {setCurrentFilter("Goal Explosion"); setNames("Goal Explosion")}}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Goal_Explosions.png")} alt="" style={currentFilter === "Goal Explosion" ? {filter: "brightness(1)"} : null} /></button>
        <button onClick={()=> {setCurrentFilter("Trail"); setNames("Trail")}}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Trails.png")} alt="" style={currentFilter === "Trail" ? {filter: "brightness(1)"} : null} /></button>
        <button onClick={()=> {setCurrentFilter("Player Banner"); setNames("Player Banner")}}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Banners.png")} alt="" style={currentFilter === "Player Banner" ? {filter: "brightness(1)"} : null} /></button>
        <button onClick={()=> {setCurrentFilter("Avatar Border"); setNames("Avatar Border")}}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Avatar_Borders.png")} alt="" style={currentFilter === "Avatar Border" ? {filter: "brightness(1)"} : null} /></button>
      </section>
    )
  }
}

export default AddTradeFiltersRL