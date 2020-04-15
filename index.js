// TODO: use an env variable?
// const loginURL = "/login";
const loginURL = "./?auth_token=123456";

let userToken = undefined;

/* EVENT LISTENERS */
document.addEventListener("click", (event) => {
  if (event.target.getAttribute("data-behavior") !== "login") return;
  initiateAuth();
  event.preventDefault();
});

document.addEventListener("click", (event) => {
  if (event.target.getAttribute("data-behavior") !== "new-code") return;
  refreshCode();
  event.preventDefault();
});

document.addEventListener("code-refreshed", (event) => {
  console.log("received code-refreshed event", event);
  if (!event.detail || !event.detail.pincode || !event.detail.qrcode) return;
  const { pincode, qrcode } = event.detail;
  const pincodeEl = document.querySelector("#pin-code");
  const qrcodeEl = document.querySelector("#qr-code");
  if (!pincodeEl || !qrcodeEl) return;
  pincodeEl.textContent = pincode;
  qrcodeEl.src = qrcode;
  console.log("refreshed the codes");
});

/* AUTH */
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
  document.querySelector("#wrapper").className = "logged-in";
  // Remove the auth-token from the url
  history.replaceState(null, "", "./");
};

/* VALIDATION CODES */

const refreshCode = () => {
  const event = new CustomEvent("code-refreshed", {
    detail: {
      pincode: 654321,
      qrcode: "QR2.png",
    },
  });
  console.log("firing code-refreshed event");
  document.dispatchEvent(event);
};

/* MAIN */
checkLoggedIn();
