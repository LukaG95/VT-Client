const temp = ["lux", "re", "bic", "disco", "vine"]
const temp2 = "ux"

const newarr = temp.map(name => {
  if (name.includes(temp2))
  return name

})

console.log(newarr)