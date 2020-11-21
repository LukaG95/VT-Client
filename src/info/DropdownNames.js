import infoRL from "../constants/RocketLeagueInfo.json";

let rl_names = ["Any"];

infoRL.Slots.forEach((Slot) =>
  Slot.Items.forEach((item) => {
    if (item.Tradable) rl_names.push(item.Name);
  })
);

const rl_dd_names = {
  gameDD: ["Rocket League"],
  searchTypeDD: ["Any", "I want to buy", "I want to sell"],
  namesDD: rl_names,
  colorDD: [
    "Any",
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
    "None",
  ],
  certDD: [
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
  itemTypeDD: ["Items", "Blueprints"],
  platformDD: ["Any", "Steam", "PS4", "XBOX", "SWITCH"],
};

export { rl_dd_names };
