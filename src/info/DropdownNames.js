import rl_names from './virItemsFilteredAll.json' 

let rl_item_names = []

rl_names.map(item => item.url.includes(".0.webp") && rl_item_names.push(item.name)) 

const rl_dd_names = {
  gameDD: ["Rocket League", "CSGO"],
  searchTypeDD: ["I want to buy", "I want to sell"],
  namesDD: rl_item_names.sort(),
  paintDD: ["None", "Crimson", "Lime", "Black", "Sky Blue", "Cobalt", "Burnt Sienna", "Forest Green", "Purple", "Pink", "Orange", "Grey", "Titanium White", "Saffron"],
  certDD: ["None", "Playmaker", "Acrobat", "Aviator", "Goalkeeper", "Guardian", "Juggler", "Paragon", "Scorer", "Show-Off", "Sniper", "Striker", "Sweeper", "Tactician", "Turtle", "Victor"],
  itemTypeDD: ["Items", "Blueprints"],
  platformDD: ["PC", "PS4", "XBOX", "SWITCH"]
}

export {rl_dd_names}

