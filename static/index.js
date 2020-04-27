/* ENDPOINTS */

// TODO: those links point to the mock backend in `mock-backend`. Replace them
// with the propper URLs to your backend.
const LOGIN_URL = "http://localhost:5000/login/";
const LOGOUT_URL = "http://localhost:5000/logout/";
const CREATECODE_URL = "https://api.openstopcovid.fr/codes/create-code";

/* EVENT LISTENERS */
document.addEventListener("checking-login", (event) => {
  console.log("received checking-login event");
  setLoginLoader();
});

document.addEventListener("logged-out", (event) => {
  console.log("received logged-out event");
  displayLoggedOut(event);
});

document.addEventListener("logged-in", (event) => {
  console.log("received logged-in event");
  displayLoggedIn(event);
});

/* VALIDATION CODES */

// QRCode instance which will display the codes received as a flashable QRCode
const qrcode = new QRCode(document.getElementById("qr-code"));

const generateCode = async (event, type, emitter) => {
  event.preventDefault();
  setLoading(event.target);
  const codeData = await getCode(type, emitter);
  const displayer = type === "qrcode" ? displayCode : displayPincode;
  displayer(codeData);
  removeLoader();
  document.location = event.target.href;
};

const getCode = async (type, emitter) => {
  // Get the code data from the backend.
  const response = await fetch(CREATECODE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emitter, type }),
  });
  const content = await response.json();
  return content;
};

const displayCode = (codeData) => {
  const { code, expireAt } = codeData;
  qrcode.clear();
  qrcode.makeCode(code);
  const date = new Date(expireAt).toLocaleString();
  const expiry = document.querySelector(
    "#qrcode [data-behavior=qr-code-expiry]"
  );
  expiry.textContent = date;
  console.log("refreshed the code");
};

const displayPincode = (codeData) => {
  const { code, expireAt } = codeData;
  const pincodeEl = document.querySelector("#pin-code");
  pincodeEl.textContent = code;
  const date = new Date(expireAt);
  const now = new Date();
  const diff = Math.round((date - now) / 1000); // Number of seconds
  const pincodeExpiryEl = document.querySelector(
    "#pincode [data-behavior=pincode-expiry]"
  );
  pincodeExpiryEl.textContent = Math.max(0, diff);
  console.log("refreshed the pincode");
};

const emailCode = (event) => {
  event.preventDefault();
  location.href =
    "mailto:sick-person@example.com?subject=QR Code à flasher sur votre application mobile StopCovid";
};

/* Loader */
const loader = document.createElement("span");
loader.className = "loader";
const loaderImg = document.createElement("img");
loaderImg.src =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' />";
loader.appendChild(loaderImg);

const setLoading = (node) => {
  const loaderNode = loader.cloneNode(true);
  node.appendChild(loaderNode);
};

const removeLoader = () => {
  const loaderNodes = document.querySelectorAll(".loader");
  const parents = Array.from(loaderNodes).map((loaderNode) => {
    loaderNode.parentNode.removeChild(loaderNode);
  });
};

/* Login/logout */
const setLoginLoader = () => {
  const loginButtons = document.querySelectorAll(
    "[data-behavior=login-button]"
  );
  Array.from(loginButtons).map((button) => {
    setLoading(button);
  });
};

const login = (event) => {
  event.preventDefault();
  // Redirect to the login page
  document.location = LOGIN_URL;
};

const logout = () => {
  event.preventDefault();
  // Redirect to the logout page
  document.location = LOGOUT_URL;
};

const displayLoggedOut = () => {
  document.body.className = "display-logged-out";
  removeLoader();
};

const displayLoggedIn = () => {
  document.body.className = "display-logged-in";
  document.location.hash = "home";
  removeLoader();
};

/* main */
const checkLoggedIn = async () => {
  const loggingInEvent = new CustomEvent("checking-login");
  document.dispatchEvent(loggingInEvent);
  const loggedInEvent = new CustomEvent("logged-in");
  document.dispatchEvent(loggedInEvent);
};

checkLoggedIn();
