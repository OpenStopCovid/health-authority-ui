/* EVENT LISTENERS */
document.addEventListener("click", (event) => {
  const handlers = {
    "generate-code": generateCode,
    "print-code": printCode,
    "email-code": emailCode,
    "generate-pincode": generatePincode,
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
};

const displayPincode = (event) => {
  document.querySelector("#wrapper").className = "displaying-pincode";
  window.scrollTo(0, 0);
  const { pincode } = event.detail;
  const pincodeEl = document.querySelector("#pin-code");
  if (!pincodeEl) return;
  pincodeEl.textContent = pincode;
  console.log("refreshed the pincode");
};

/* VALIDATION CODES */

const generateCode = () => {
  const event = new CustomEvent("code-refreshed", {
    detail: {
      qrcode: "QR.png",
    },
  });
  console.log("firing code-refreshed event");
  document.dispatchEvent(event);
};

const generatePincode = () => {
  const event = new CustomEvent("pincode-refreshed", {
    detail: {
      pincode: 123456,
    },
  });
  console.log("firing pincode-refreshed event");
  document.dispatchEvent(event);
};

const printCode = () => {
  window.print();
};

const emailCode = () => {
  location.href =
    "mailto:sick-person@example.com?subject=QR Code à flasher sur votre application mobile StopCovid";
};
