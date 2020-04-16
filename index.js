/* EVENT LISTENERS */
document.addEventListener("click", (event) => {
  if (event.target.getAttribute("data-behavior") !== "generate-code") return;
  generateCode();
  displayCode();
  event.preventDefault();
});

document.addEventListener("click", (event) => {
  if (event.target.getAttribute("data-behavior") !== "new-code") return;
  generateCode();
  displayCode();
  event.preventDefault();
});

document.addEventListener("code-refreshed", (event) => {
  console.log("received code-refreshed event", event);
  if (!event.detail || !event.detail.qrcode) return;
  const { qrcode } = event.detail;
  const qrcodeEl = document.querySelector("#qr-code");
  if (!qrcodeEl) return;
  qrcodeEl.src = qrcode;
  console.log("refreshed the code");
});

/* PAGES */

const displayCode = () => {
  document.querySelector("#wrapper").className = "displaying-code";
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
