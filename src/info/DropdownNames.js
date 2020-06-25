import rln from './rl_names.json'

const rl_names = 
rln.Wheels.concat(rln.Wheels).concat(rln.Trails).concat(rln.Banners).concat(rln["Goal Explosions"])
.concat(rln.Bodies).concat(rln["Rocket Boosts"]).concat(rln.Antennas).concat(rln.Toppers).concat(rln.Decals).concat(rln["Paint Finishes"])
.concat(rln["Engine Audio"]).concat(rln["Avatar Borders"])


const rl_dd_names = {
  gameDD: ["Rocket League"],
  searchTypeDD: ["I want to buy", "I want to sell"],
  namesDD: rl_names,
  paintDD: ["Any", "Crimson", "Lime", "Black", "Sky Blue", "Cobalt", "Burnt Sienna", "Forest Green", "Purple", "Pink", "Orange", "Grey", "Titanium White", "Saffron"],
  certDD: ["Any", "Playmaker", "Acrobat", "Aviator", "Goalkeeper", "Guardian", "Juggler", "Paragon", "Scorer", "Show-Off", "Sniper", "Striker", "Sweeper", "Tactician", "Turtle", "Victor"],
  itemTypeDD: ["Items", "Blueprints"],
  platformDD: ["PC", "PS4", "XBOX", "SWITCH"]
}

export {rl_dd_names}

