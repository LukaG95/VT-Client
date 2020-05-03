import React, {useState, useEffect} from 'react'
import RLitem_icon from '../components/RLitem_icon'
import RLfilter_icon from '../components/RLfilter_icon'
import Spinner from '../components/Spinner'
import {RLitem_names} from '../info/RLitem_names'

function AddTradeRL() {
  const [have, setHave] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
  const [want, setWant] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
  const [notes, setNotes] = useState("")
  const [platform, setPlatform] = useState("Steam")

  const [itemImages, setItemImages] = useState()

  useEffect(() => {
    const names = RLitem_names.map(name=> 
      <img style={{height: "95px", width: "95px"}} src={require(`../images/RLimages/${name}`)} alt="" />
    )

    setItemImages(names)
  }, [])

  return (
    <div className="addRLWrapper">
      
      <div className="newTradeTitle">
        Create new trade
      </div>


      <div className="rlHaveWantSection">
        <div className="h-wTopPlace">
          <div className="left-gameName">Rocket League PC</div>
          <div className="right-gamePlatform">Steam</div>
        </div>
      </div>


      <div className="rlChooseItemsSection">
        <div className="choose-itemsTopPlace">Choose the items</div>
        <div className="choose-itemsSeachFiltersRL">
          <div><img style={{width: "11px", height: "11px"}} src={require("../images/other/MagnGlass.png")} /></div>
          <input placeholder="Search items..."></input>
          <RLfilter_icon />
        </div>
        <div className="item-imagesRL">
          {itemImages === undefined ? <Spinner /> : itemImages}
        </div>
      </div>


      <div className="rlSubmitNotes">
        <div className="rlSubmitButton">SUBMIT TRADE</div>
        <div className="rlNotesButton">NOTES</div>
      </div>

    </div>
  )
}

export default AddTradeRL;
