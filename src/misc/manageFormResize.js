// resize Sign in / Sign up forms when changing window width
export default (width, openForm) => {
  if (width < 700 && openForm === true) {
    try {
      const form = document.getElementById("logForm");
      const body = document.body;

      form.style.height = "100%";
      form.style.width = "100%";
      body.style.overflowY = "hidden";
    } catch {}
  } else if (width >= 700 && openForm === true) {
    try {
      const form = document.getElementById("logForm");
      const body = document.body;

      form.style.height = "auto";
      form.style.width = "440px";
      body.style.overflowY = "scroll";
    } catch {}
  }
}