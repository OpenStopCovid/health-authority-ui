/* ENDPOINTS */

const LOGIN_URL = "http://127.0.0.1:5000/login/";
const LOGOUT_URL = "http://127.0.0.1:5000/logout/";
const USERINFO_URL = "http://127.0.0.1:5000/user-info/";

const CREATECODE_URL = "http://127.0.0.1:5000/create-code/";

/* UTILS */
const authFetch = async (url, options) => {
  return fetch(url, {
    credentials: "include",
    ...options,
  });
};

/* EVENT LISTENERS */
document.addEventListener("code-refreshed", (event) => {
  console.log("received code-refreshed event", event);
  if (!event.detail || !event.detail.code) return;
  displayCode(event);
});

document.addEventListener("pincode-refreshed", (event) => {
  console.log("received pincode-refreshed event", event);
  if (!event.detail || !event.detail.code) return;
  displayPincode(event);
});

document.addEventListener("checking-login", (event) => {
  console.log("received checking-login event", event);
  setLoginLoader();
});

document.addEventListener("logged-out", (event) => {
  console.log("received logged-out event", event);
  displayLoggedOut(event);
});

document.addEventListener("logged-in", (event) => {
  console.log("received logged-in event", event);
  displayLoggedIn(event);
});

/* VALIDATION CODES */

// QRCode instance which will display the codes received as a flashable QRCode
const qrcode = new QRCode(document.getElementById("qr-code"));
const qrcodeLab = new QRCode(document.getElementById("qr-code-lab"));

const generateCode = async (event, type, emitter) => {
  event.preventDefault();
  setLoading(event.target);
  const codeData = await getCode(type, emitter);
  const displayer =
    type === "qrcode"
      ? emitter === "doctor"
        ? displayCode
        : displayCodeLab
      : displayPincode;
  displayer(codeData);
  removeLoader();
  document.location = event.target.href;
};

const getCode = async (type, emitter) => {
  // Get the code data from the backend.
  const response = await authFetch(CREATECODE_URL, {
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
  console.log("refreshed the code");
};

const displayCodeLab = (codeData) => {
  const { code, expireAt } = codeData;
  qrcodeLab.clear();
  qrcodeLab.makeCode(code);
  console.log("refreshed the code");
};

const displayPincode = (codeData) => {
  const { code, expireAt } = codeData;
  const pincodeEl = document.querySelector("#pin-code");
  pincodeEl.textContent = code;
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

  const response = await authFetch(USERINFO_URL);
  if (response.status !== 200) {
    const loggedOutEvent = new CustomEvent("logged-out");
    document.dispatchEvent(loggedOutEvent);
    return;
  }
  const loggedInEvent = new CustomEvent("logged-in");
  document.dispatchEvent(loggedInEvent);
};

checkLoggedIn();
