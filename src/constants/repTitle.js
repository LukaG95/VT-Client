export default function repTitle(amount) {
  if (amount > 4) return "Novice"
  else if (amount > 49) return "Veteran"
  else if (amount > 249) return "Master"
  else if (amount > 749) return "Pro"
  else return null

}
