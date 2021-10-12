export default function checkPath(path) {
  if (
    path === "/" || 
    path === "/trading" || 
    path.substr(0, 7) === '/trades' ||
    path.substr(0, 11) === '/reputation' ||
    path.substr(0, 6) === '/rules' ||
    path === "/terms" ||
    path === "/privacy" ||
    path === "/security"
  )
    return true
  else
    return false
}

// check what page to return footer at