export function goTo1stPage() {
  document.getElementById("sidebar-2nd-page").style.transform =
    "translateX(100%)";
  document.getElementById("sidebar-1st-page").style.transform =
    "translateX(0%)";
}

export function goTo2ndPage() {
  document.getElementById("sidebar-1st-page").style.transform =
    "translateX(-100%)";
  document.getElementById("sidebar-2nd-page").style.transform =
    "translateX(0%)";
}