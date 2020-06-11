import React, {useContext} from 'react'
import {RLitem_names} from '../info/RLitem_names'
import rl_items from '../info/virItemsFiltered.json' 
import rl_items_all from '../info/virItemsFilteredAll.json' 
import {TradeContext} from './TradeContextRL'

function RLfilter_icon({itemImages, setItemImages}) {

  const {pushItem} = useContext(TradeContext)

  function setNames(type){
    if (type === "all"){
      const names = rl_items_all.map(item => {   
        if (item.url.includes(".0.webp")){
          return (
            <img 
            name={item.url} 
            style={{height: "95px", width: "95px"}} 
            src={require(`../images/RLimages/${item.url}`)} 
            alt="" 
            onClick={e => pushItem(e)} 
            />
          )
        }
        else return null
      })
      setItemImages(names)
      
    }
    else{
      const names = rl_items[`${type}`].map(item => {   
        if (item.url.includes(".0.webp")){
          return (
            <img 
            name={item.url} 
            style={{height: "95px", width: "95px"}} 
            src={require(`../images/RLimages/${item.url}`)} 
            alt="" 
            onClick={e => pushItem(e)} 
            />
          )
        }
        else return null
      })
      setItemImages(names)
      console.log(names)
   }
  }
  
 
	return (
    <>
      <input onChange={e=> {
        let temp = rl_items_all.map(item => {   
          if (item.name.toLowerCase().includes(e.target.value.toLowerCase()) && item.url.includes(".0.webp")){
            return(
              <img 
                name={item.url} 
                style={{height: "95px", width: "95px"}} 
                src={require(`../images/RLimages/${item.url}`)} 
                alt={require(`../images/RLimages/round.png`)} 
                onClick={e => pushItem(e)} 
              />
            )
          }else return null
        })
        
        setItemImages(temp)

      }}placeholder="Search items..."></input>

      <section className="RLfilter_icons_section">		
        <button onClick={()=> setNames("all")}><img className="RLfilter_icon" src={require("../images/rl_filter_icons/Transparent/All.png")} /></button>
        <button onClick={()=> setNames("bluprints")}><img className="RLfilter_icon" src={require("../images/rl_filter_icons/Transparent/Blueprints.png")} /></button>
        <button onClick={()=> setNames("crates")}><img className="RLfilter_icon" src={require("../images/rl_filter_icons/Transparent/Gift_Packs.png")} /></button>
        <button onClick={()=> setNames("bodies")}><img className="RLfilter_icon" src={require("../images/rl_filter_icons/Transparent/Bodies.png")} /></button>
        <button onClick={()=> setNames("decals")}><img className="RLfilter_icon" src={require("../images/rl_filter_icons/Transparent/Decals.png")} /></button>
        <button onClick={()=> setNames("paints")}><img className="RLfilter_icon" src={require("../images/rl_filter_icons/Transparent/Paint_Finishes.png")} /></button>
        <button onClick={()=> setNames("wheels")}><img className="RLfilter_icon" src={require("../images/rl_filter_icons/Transparent/Wheels.png")} /></button>
        <button onClick={()=> setNames("boosts")}><img className="RLfilter_icon" src={require("../images/rl_filter_icons/Transparent/Boosts.png")} /></button>
        <button onClick={()=> setNames("toppers")}><img className="RLfilter_icon" src={require("../images/rl_filter_icons/Transparent/Toppers.png")} /></button>
        <button onClick={()=> setNames("antennas")}><img className="RLfilter_icon" src={require("../images/rl_filter_icons/Transparent/Antennas.png")} /></button>
        <button onClick={()=> setNames("explosions")}><img className="RLfilter_icon" src={require("../images/rl_filter_icons/Transparent/Goal_Explosions.png")} /></button>
        <button onClick={()=> setNames("trails")}><img className="RLfilter_icon" src={require("../images/rl_filter_icons/Transparent/Trails.png")} /></button>
        <button onClick={()=> setNames("banners")}><img className="RLfilter_icon" src={require("../images/rl_filter_icons/Transparent/Banners.png")} /></button>
        <button onClick={()=> setNames("borders")}><img className="RLfilter_icon" src={require("../images/rl_filter_icons/Transparent/Avatar_Borders.png")} /></button>
      </section>
    </>
	)
}

export default RLfilter_icon;