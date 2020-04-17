/* ENDPOINTS */

const LOGIN_URL = "http://127.0.0.1:5000/login/";
const LOGOUT_URL = "http://127.0.0.1:5000/logout/";

/* EVENT LISTENERS */
document.addEventListener("click", (event) => {
  const handlers = {
    "generate-code": generateCode,
    "print-code": printCode,
    "email-code": emailCode,
    "generate-pincode": generatePincode,
    "login-button": login,
    "logout-button": logout,
  };
  const behavior = event.target.getAttribute("data-behavior");
  const handler = handlers[behavior];
  if (!handler) return;
  event.preventDefault();
  handler(event);
});

document.addEventListener("code-refreshed", (event) => {
  console.log("received code-refreshed event", event);
  if (!event.detail || !event.detail.qrcode) return;
  displayCode(event);
});

document.addEventListener("pincode-refreshed", (event) => {
  console.log("received pincode-refreshed event", event);
  if (!event.detail || !event.detail.pincode) return;
  displayPincode(event);
});

/* PAGES */

const displayCode = (event) => {
  document.querySelector("#wrapper").className = "displaying-code";
  window.scrollTo(0, 0);
  const { qrcode } = event.detail;
  const qrcodeEl = document.querySelector("#qr-code");
  if (!qrcodeEl) return;
  qrcodeEl.src = qrcode;
  console.log("refreshed the code");
  removeLoader();
};

const displayPincode = (event) => {
  document.querySelector("#wrapper").className = "displaying-pincode";
  window.scrollTo(0, 0);
  const { pincode } = event.detail;
  const pincodeEl = document.querySelector("#pin-code");
  if (!pincodeEl) return;
  pincodeEl.textContent = pincode;
  console.log("refreshed the pincode");
  removeLoader();
};

/* VALIDATION CODES */

const generateCode = (event) => {
  setLoading(event.target);
  const newCodeEvent = new CustomEvent("code-refreshed", {
    detail: {
      qrcode: "QR.png",
    },
  });
  console.log("firing code-refreshed event");
  document.dispatchEvent(newCodeEvent);
};

const generatePincode = (event) => {
  setLoading(event.target);
  const newPinCodeEvent = new CustomEvent("pincode-refreshed", {
    detail: {
      pincode: 123456,
    },
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
  node.appendChild(loader);
};

const removeLoader = () => {
  loader.parentNode.removeChild(loader);
};

/* Login/logout */
const login = () => {
  // Redirect to the login page
  document.location = LOGIN_URL;
};

const logout = () => {
  document.location = LOGOUT_URL;
};
