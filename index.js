/* EVENT LISTENERS */
document.addEventListener("click", (event) => {
  const handlers = {
    "generate-code": generateCode,
    "print-code": printCode,
    "email-code": emailCode,
    "display-pincode": displayPinCode,
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

/* PAGES */

const displayCode = (event) => {
  document.querySelector("#wrapper").className = "displaying-code";
  const { qrcode } = event.detail;
  const qrcodeEl = document.querySelector("#qr-code");
  if (!qrcodeEl) return;
  qrcodeEl.src = qrcode;
  console.log("refreshed the code");
};

const displayPinCode = () => {
  console.log("TODO: display the pin code");
};

/* VALIDATION CODES */

const generateCode = () => {
  const event = new CustomEvent("code-refreshed", {
    detail: {
      pincode: 123456,
      qrcode: "QR.png",
    },
  });
  console.log("firing code-refreshed event");
  document.dispatchEvent(event);
};

const printCode = () => {
  window.print();
};

const emailCode = () => {
  location.href =
    "mailto:sick-person@example.com?subject=QR Code à flasher sur votre application mobile StopCovid";
};
