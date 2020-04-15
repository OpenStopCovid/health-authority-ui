document.addEventListener("click", (event) => {
  if (event.target.getAttribute("data-behavior") !== "login") return;
  console.log("login clicked");
});
