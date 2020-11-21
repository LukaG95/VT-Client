import RocketLeagueInfo from "./RocketLeagueInfo.json";
import All from "../images/types/Transparent/All.png";
import Blueprint from "../images/types/Transparent/Blueprints.png";
import Crate from "../images/types/Transparent/Gift_Packs.png";
import Body from "../images/types/Transparent/Bodies.png";
import Decal from "../images/types/Transparent/Decals.png";
import PaintFinish from "../images/types/Transparent/Paint_Finishes.png";
import Wheels from "../images/types/Transparent/Wheels.png";
import RocketBoost from "../images/types/Transparent/Boosts.png";
import Topper from "../images/types/Transparent/Toppers.png";
import Antenna from "../images/types/Transparent/Antennas.png";
import GoalExplosion from "../images/types/Transparent/Goal_Explosions.png";
import Trail from "../images/types/Transparent/Trails.png";
import PlayerBanner from "../images/types/Transparent/Banners.png";
import AvatarBorder from "../images/types/Transparent/Avatar_Borders.png";

//Memoize All Tradeable Items
let tradeableItems = null;
export function getTradeableItems() {
  if (!tradeableItems) {
    tradeableItems = [];
    RocketLeagueInfo.Slots.forEach((slot) => {
      slot.Items.forEach((item) => {
        if (item.Tradable) tradeableItems.push({
          itemID: item.ItemID,
          itemName: item.Name,
          itemType: slot.Name
        });
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
  Quality: "Common",
  itemType: "Body",
  color: "Unpainted",
  colorID: "",
  cert: "",
  amount: 0
}