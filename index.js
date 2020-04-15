// TODO: use an env variable?
// const loginURL = "/login";
const loginURL = "./?auth_token=123456";

let userToken = undefined;

document.addEventListener("click", (event) => {
  if (event.target.getAttribute("data-behavior") !== "login") return;
  initiateAuth();
});

const initiateAuth = () => {
  // Redirect to the login URL
  document.location = loginURL;
};

const checkLoggedIn = () => {
  // Parse the search params
  const searchParams = new URLSearchParams(
    document.location.search.replace(/\?/, "")
  );
  // Update the userToken in memory
  userToken = searchParams.get("auth_token");
  if (userToken) {
    setLoggedIn();
  }
};

const setLoggedIn = (userToken) => {
  // Display the "logged in" screen
  document.body.className = "logged-in";
  // Remove the auth-token from the url
  history.replaceState(null, "", "./");
};

// MAIN
checkLoggedIn();
