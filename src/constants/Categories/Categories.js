import Moneyinfo from "./Moneyinfo.json";
import Designinfo from "./Designinfo.json";
import KACinfo from "./KACinfo.json";
import CSGOinfo from "./CSGOinfo.json";

export const Categories = {
  ROCKET_LEAGUE: "Rocket League",
  MONEY: "Money",
  DESIGN: "Design",
  CSGO: "CSGO",
  KEYS_AND_CURRENCY: "Keys And Currency"
};

export const CategoriesJson = {
  "Money": Moneyinfo,
  "Design": Designinfo,
  "Keys And Currency": KACinfo,
  "CSGO": CSGOinfo
}

export const CategoryFilters = {
  "Rocket League": {
    name: "",
    quality: "Any",
    type: "Any",
    platform: "Any"
  },

  "Money": {

  },

  "Design": {

  },

  "CSGO": {
    
  },

  "Keys And Currency": {

  }


}