// TODO: use an env variable?
// const loginURL = "/login";
const loginURL = "./?auth_token=123456";

let userToken = undefined;

document.addEventListener("click", (event) => {
  if (event.target.getAttribute("data-behavior") !== "login") return;
  initiateAuth();
});

const initiateAuth = () => {
  document.location = loginURL;
};

const checkLoggedIn = () => {
  const searchParams = new URLSearchParams(
    document.location.search.replace(/\?/, "")
  );
  userToken = searchParams.get("auth_token");
  if (userToken) {
    setLoggedIn();
  }
};

const setLoggedIn = () => {
  document.body.className = "logged-in";
  history.replaceState(null, "", "./");
};

// MAIN
checkLoggedIn();
