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
document.addEventListener("click", (event) => {
  const handlers = {
    "generate-code": generateCode,
    "print-code": printCode,
    "email-code": emailCode,
    "generate-pincode": generatePincode,
    "login-button": login,
    "logout-button": logout,
    "back-home": displayHome,
  };
  const behavior = event.target.getAttribute("data-behavior");
  const handler = handlers[behavior];
  if (!handler) return;
  event.preventDefault();
  handler(event);
});

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

document.addEventListener("logging-in", (event) => {
  console.log("received logging-in event", event);
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

/* PAGES */

const displayHome = (event) => {
  document.querySelector("#wrapper").className = "displaying-home";
  window.scrollTo(0, 0);
  removeLoader();
};

const displayCode = (event) => {
  document.querySelector("#wrapper").className = "displaying-code";
  window.scrollTo(0, 0);
  const { code } = event.detail;
  qrcode.clear();
  qrcode.makeCode(code);
  console.log("refreshed the code");
  removeLoader();
};

const displayPincode = (event) => {
  document.querySelector("#wrapper").className = "displaying-pincode";
  window.scrollTo(0, 0);
  const { code } = event.detail;
  const pincodeEl = document.querySelector("#pin-code");
  if (!pincodeEl) return;
  pincodeEl.textContent = code;
  console.log("refreshed the pincode");
  removeLoader();
};

/* VALIDATION CODES */

// QRCode instance which will display the codes received as a flashable QRCode
const qrcode = new QRCode(document.getElementById("qr-code"));

const generateCode = async (event) => {
  setLoading(event.target);
  const response = await authFetch(CREATECODE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emitter: "doctor", type: "qrcode" }),
  });
  const content = await response.json();
  console.log("response", content);
  const newCodeEvent = new CustomEvent("code-refreshed", {
    detail: content,
  });
  console.log("firing code-refreshed event");
  document.dispatchEvent(newCodeEvent);
};

const generatePincode = async (event) => {
  setLoading(event.target);
  const response = await authFetch(CREATECODE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emitter: "doctor", type: "pincode" }),
  });
  const content = await response.json();
  console.log("response", content);
  const newPinCodeEvent = new CustomEvent("pincode-refreshed", {
    detail: content,
  });
  console.log("firing pincode-refreshed event");
  document.dispatchEvent(newPinCodeEvent);
};

const printCode = () => {
  window.print();
};

const emailCode = () => {
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
    console.log("setLoading", button);
    setLoading(button);
  });
};

const login = () => {
  // Redirect to the login page
  document.location = LOGIN_URL;
};

const logout = () => {
  document.location = LOGOUT_URL;
};

const displayLoggedOut = () => {
  document.body.className = "display-logged-out";
  removeLoader();
};

const displayLoggedIn = () => {
  document.body.className = "display-logged-in";
  removeLoader();
};

/* main */
const checkLoggedIn = async () => {
  const loggingInEvent = new CustomEvent("logging-in");
  console.log("firing logging-in event");
  document.dispatchEvent(loggingInEvent);

  const response = await authFetch(USERINFO_URL);
  if (response.status !== 200) {
    const loggedOutEvent = new CustomEvent("logged-out");
    console.log("firing logged-out event");
    document.dispatchEvent(loggedOutEvent);
    return;
  }
  const loggedInEvent = new CustomEvent("logged-in");
  console.log("firing logged-in event");
  document.dispatchEvent(loggedInEvent);
};

checkLoggedIn();
