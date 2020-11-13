const { innerWidth: width } = window;

function viewSidebar() {
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("main"); // main context + shader (because main has margin left and right)
  const body = document.body;
  const shade = document.getElementById("shader");

  try {
    // try catch because of error when we use page back, elements (starting with main) aren't defined
    width >= 650
      ? (main.style.transform = "translateX(400px)")
      : (main.style.transform = `translateX(${
          sidebar.getBoundingClientRect().width
        }px)`);
    sidebar.style.transform = "translateX(0%)";
    body.style.overflowY = "hidden";

    shade.classList.add("sidebar-shading");
  } catch {
    return null;
  }
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("main");
  const body = document.body;
  const shade = document.getElementById("shader");

  try {
    main.style.transform = "translateX(0%)";
    sidebar.style.transform = "translateX(-100%)";
    body.style.overflowY = "scroll";

    shade.classList.remove("sidebar-shading");
  } catch {
    return null;
  }
}

export { viewSidebar, closeSidebar };
