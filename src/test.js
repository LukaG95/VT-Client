import React, {useState, useEffect, useContext} from 'react'

import infoRL from './info/infoRL.json' 
import imageExists from './misc/func'
import LazyLoad from 'react-lazyload'
import Placeholder from './pages/Rocket League/AddTrade/Placeholder'
import Img from "react-cool-img";

function AddTradeRL() {

  return(
      <div className="teaaaast">
        {
          infoRL.Slots.map(Slot => Slot.Items.map(item => {
            if (item.Tradable) return(  
              <LazyLoad scrollContainer={".teaaaast"} placeholder={<Placeholder item={item}/>}>
                <div className="RLicon noUserInteraction">
                  
                  <img 
                    style={{height: "auto", minHeight: "90px", width: "100%", maxWidth: "130px", cursor: "pointer", borderRadius: "5px 5px 0px 0px"}} 
                    src={imageExists(`${item.ItemID}.0.webp`)}
                    alt=""
                  />

                  <div className="RLicon-name">{item.Name}</div>
                </div>
               </LazyLoad>
             )
           }))
        }
      </div>
  )

  
}

export default AddTradeRL

/* 

  <LazyLoad once overflow={true} scrollContainer={".teaaaast"} placeholder={<Placeholder />} debounce={1}>

  <Img 
    cache={false}
    style={{background: "grey", height: "auto", width: "100%", maxWidth: "105px", cursor: "pointer", borderRadius: "5px 5px 0px 0px"}} 
    src={imageExists(`${item.ItemID}.0.webp`)}
    alt="load.."
  />



import React, {useState, useEffect, useContext} from 'react'

import infoRL from '../../../info/infoRL.json' 
import imageExists from '../../../misc/func'
import LazyLoad from 'react-lazyload'

function AddTradeRL() {

  return(
      <div className="item-imagesRL">
        {
          infoRL.Slots.map(Slot => Slot.Items.map(item => {
            if (item.Tradable) return(
              <div className="RLicon noUserInteraction">
                
                <img 
                  style={{height: "auto", width: "100%", maxWidth: "105px", cursor: "pointer", borderRadius: "5px 5px 0px 0px"}} 
                  src={imageExists(`${item.ItemID}.0.webp`)}
                  onClick={() => {setTradeErrorMsg(""); pushItem(item)}} 
                />
                <div onClick={() => {setTradeErrorMsg(""); pushItem(item)}} className="RLicon-name">{item.Name}</div>
              </div>
            )
          }))
        }
      </div>
  )

  
}

export default AddTradeRL


*/