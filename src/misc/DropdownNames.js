import infoRL from "../constants/Categories/RLinfo.json";

let rl_names = ["Any"];

infoRL.items.forEach((item) => {
    if (item.Tradable) rl_names.push(item.Name);
  })

const rl_dd_names = {
  gameDD: ["Rocket League"],
  searchTypeDD: ["Any", "I want to buy", "I want to sell"],
  namesDD: rl_names,
  colorDD: [
    "Any",
    "None",
    "Crimson",
    "Lime",
    "Black",
    "Sky Blue",
    "Cobalt",
    "Burnt Sienna",
    "Forest Green",
    "Purple",
    "Pink",
    "Orange",
    "Grey",
    "Titanium White",
    "Saffron",
  ],
  colorEditDD: [
    "None",
    "Crimson",
    "Lime",
    "Black",
    "Sky Blue",
    "Cobalt",
    "Burnt Sienna",
    "Forest Green",
    "Purple",
    "Pink",
    "Orange",
    "Grey",
    "Titanium White",
    "Saffron",
  ],
  certDD: [
    "Any",
    "None",
    "Playmaker",
    "Acrobat",
    "Aviator",
    "Goalkeeper",
    "Guardian",
    "Juggler",
    "Paragon",
    "Scorer",
    "Show-Off",
    "Sniper",
    "Striker",
    "Sweeper",
    "Tactician",
    "Turtle",
    "Victor",
  ],
  certEditDD: [
    "None",
    "Playmaker",
    "Acrobat",
    "Aviator",
    "Goalkeeper",
    "Guardian",
    "Juggler",
    "Paragon",
    "Scorer",
    "Show-Off",
    "Sniper",
    "Striker",
    "Sweeper",
    "Tactician",
    "Turtle",
    "Victor",
  ],
  itemTypeDD: ["Any", "Item", "Blueprint"],
  platformDD: ["Any", "Steam", "PS4", "XBOX", "SWITCH", "EPIC"],
};

export { rl_dd_names };
