import rl_names from './rl_items.json' 

let rl_item_names = []

const x = rl_names.Slots.map(type => {
  return type.Items.map(item => item.Name.length < 25 && (rl_item_names.push(item.Name)))
  }) 

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

