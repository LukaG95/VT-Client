import RLInfo from "./RLinfo.json";
import All from "../images/icons/RL add trade filter icons/All.png";
import Blueprint from "../images/icons/RL add trade filter icons/Blueprints.png";
import Crate from "../images/icons/RL add trade filter icons/Gift_Packs.png";
import Body from "../images/icons/RL add trade filter icons/Bodies.png";
import Decal from "../images/icons/RL add trade filter icons/Decals.png";
import PaintFinish from "../images/icons/RL add trade filter icons/Paint_Finishes.png";
import Wheels from "../images/icons/RL add trade filter icons/Wheels.png";
import RocketBoost from "../images/icons/RL add trade filter icons/Boosts.png";
import Topper from "../images/icons/RL add trade filter icons/Toppers.png";
import Antenna from "../images/icons/RL add trade filter icons/Antennas.png";
import GoalExplosion from "../images/icons/RL add trade filter icons/Goal_Explosions.png";
import Trail from "../images/icons/RL add trade filter icons/Trails.png";
import PlayerBanner from "../images/icons/RL add trade filter icons/Banners.png";
import AvatarBorder from "../images/icons/RL add trade filter icons/Avatar_Borders.png";

//Memoize All Tradeable Items
let tradeableItems = null;
export function getTradeableItems() {
  if (!tradeableItems) {
    tradeableItems = [];
    RLInfo.items.forEach((item) => {
        if (item.Tradable)
          tradeableItems.push({
            itemID: item.ItemID,
            itemName: item.Name,
            itemType: item.Slot,
            quality: item.Quality,
            paintable: item.Paintable,
            blueprintable: item.Blueprintable,
            blueprint: false
          });
      });
  }
  return tradeableItems;
}

export const ItemTypes = [
  {
    type: "Any",
    image: All,
  },
  {
    type: "Blueprint",
    image: Blueprint,
  },
  {
    type: "Crate",
    image: Crate,
  },
  {
    type: "Body",
    image: Body,
  },
  {
    type: "Decal",
    image: Decal,
  },
  {
    type: "Paint Finish",
    image: PaintFinish,
  },
  {
    type: "Wheels",
    image: Wheels,
  },
  {
    type: "Rocket Boost",
    image: RocketBoost,
  },
  {
    type: "Topper",
    image: Topper,
  },
  {
    type: "Antenna",
    image: Antenna,
  },
  {
    type: "Goal Explosion",
    image: GoalExplosion,
  },
  {
    type: "Trail",
    image: Trail,
  },
  {
    type: "Player Banner",
    image: PlayerBanner,
  },
  {
    type: "Avatar Border",
    image: AvatarBorder,
  },
];

export const DefaultItem = {
  itemID: 0,
  itemName: "Unknown",
  itemType: "Body",
  color: "None",
  colorID: 0,
  cert: "None",
  amount: 1,
};
