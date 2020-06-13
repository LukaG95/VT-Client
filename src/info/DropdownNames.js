import rl_names from './virItemsFilteredAll.json' 

let rl_item_names = []

rl_names.map(item => item.url.includes(".0.webp") && rl_item_names.push(item.name)) 
let ref_rl_item_names = rl_item_names.sort()
ref_rl_item_names.splice(0, 0, "Any")

const rl_dd_names = {
  gameDD: ["Rocket League", "CSGO"],
  searchTypeDD: ["I want to buy", "I want to sell"],
  namesDD: ref_rl_item_names,
  paintDD: ["Any", "Crimson", "Lime", "Black", "Sky Blue", "Cobalt", "Burnt Sienna", "Forest Green", "Purple", "Pink", "Orange", "Grey", "Titanium White", "Saffron"],
  certDD: ["Any", "Playmaker", "Acrobat", "Aviator", "Goalkeeper", "Guardian", "Juggler", "Paragon", "Scorer", "Show-Off", "Sniper", "Striker", "Sweeper", "Tactician", "Turtle", "Victor"],
  itemTypeDD: ["Items", "Blueprints"],
  platformDD: ["PC", "PS4", "XBOX", "SWITCH"]
}

export {rl_dd_names}

