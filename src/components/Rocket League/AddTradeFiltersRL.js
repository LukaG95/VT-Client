import React, {useContext} from 'react'

import {TradeContextRL} from './TradeContextRL'
import infoRL from '../../info/infoRL.json' 
import imageExists from '../../misc/func'

function RLfilter_icon({setItemImages, setTradeErrorMsg}) {

  const {pushItem} = useContext(TradeContextRL)
  
	return (
    <>
      <input onChange={e=> {
        let thumbnails = []
        infoRL.Slots.map(Slot => Slot.Items.map(item => {
          if (item.Tradable && item.Name.toLowerCase().includes(e.target.value.toLowerCase())) 
            thumbnails.push(
              <div className="RLicon noUserInteraction">
                <img 
                  style={{height: "95px", width: "95px", cursor: "pointer", borderRadius: "5px 5px 0px 0px"}} 
                  src={imageExists(`${item.ItemID}.0.webp`)}
                  onClick={() => {setTradeErrorMsg(""); pushItem(item)}} 
                />
                <div className="RLicon-name"><p>{item.Name}</p></div>
              </div>
            )
        }))
        setItemImages(thumbnails)

      }}placeholder="Search items..."></input>

      <section className="RLfilter_icons_section">		
        <button onClick={()=> setNames("All")}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/All.png")} /></button>
        <button onClick={()=> setNames("Blueprint")}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Blueprints.png")} /></button>
        <button onClick={()=> setNames("Crate")}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Gift_Packs.png")} /></button>
        <button onClick={()=> setNames("Body")}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Bodies.png")} /></button>
        <button onClick={()=> setNames("Decal")}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Decals.png")} /></button>
        <button onClick={()=> setNames("Paint Finish")}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Paint_Finishes.png")} /></button>
        <button onClick={()=> setNames("Wheels")}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Wheels.png")} /></button>
        <button onClick={()=> setNames("Rocket Boost")}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Boosts.png")} /></button>
        <button onClick={()=> setNames("Topper")}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Toppers.png")} /></button>
        <button onClick={()=> setNames("Antenna")}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Antennas.png")} /></button>
        <button onClick={()=> setNames("Goal Explosion")}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Goal_Explosions.png")} /></button>
        <button onClick={()=> setNames("Trail")}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Trails.png")} /></button>
        <button onClick={()=> setNames("Player Banner")}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Banners.png")} /></button>
        <button onClick={()=> setNames("Avatar Border")}><img className="RLfilter_icon" src={require("../../images/rl_filter_icons/Transparent/Avatar_Borders.png")} /></button>
      </section>
    </>
  )
  

  /*-----Functions                -------------*/

  function setNames(type){
    if (type === "All"){
      let thumbnails = []
      infoRL.Slots.map(Slot => Slot.Items.map(item => {
        item.Tradable && thumbnails.push(
          <div className="RLicon noUserInteraction">
            <img 
              style={{height: "95px", width: "95px", cursor: "pointer", borderRadius: "5px 5px 0px 0px"}} 
              src={imageExists(`${item.ItemID}.0.webp`)}
              onClick={() => {setTradeErrorMsg(""); pushItem(item)}} 
            />
            <div className="RLicon-name"><p>{item.Name}</p></div>
          </div>
        )
      }))
      setItemImages(thumbnails)

    }
    else{
      let thumbnails = []
      infoRL.Slots.map(Slot => Slot.Name === type && Slot.Items.map(item => {
        item.Tradable && thumbnails.push(
          <div className="RLicon noUserInteraction">
            <img 
              style={{height: "95px", width: "95px", cursor: "pointer", borderRadius: "5px 5px 0px 0px"}} 
              src={imageExists(`${item.ItemID}.0.webp`)}
              onClick={() => {setTradeErrorMsg(""); pushItem(item)}} 
            />
            <div className="RLicon-name"><p>{item.Name}</p></div>
          </div>
        )
      }))
      setItemImages(thumbnails)
   }
  }
}

export default RLfilter_icon;