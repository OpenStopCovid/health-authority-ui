
import { useEffect } from 'react';

const authFetch = async (url, options) => {
  return fetch(url, {
    credentials: "include",
    ...options,
  });
};

class MUI_Main extends React.Component {

    qrcode = undefined
    loader = undefined
    USERINFO_URL = "http://localhost:5000/user-info/";
    CREATECODE_URL = "http://localhost:5000/create-code/";

    removeLoader = () => {
        const loaderNodes = document.querySelectorAll(".loader");
        const parents = Array.from(loaderNodes).map((loaderNode) => {
            loaderNode.parentNode.removeChild(loaderNode);
        });
    }

    setLoading = (node) => {
        const loaderNode = this.loader.cloneNode(true);
        node.appendChild(loaderNode);
    }

    getCode = async (type, emitter) => {
        // Get the code data from the backend.
        const response = await authFetch(this.CREATECODE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ emitter, type }),
        });
        const content = await response.json();
        return content;
    }

    setLoginLoader = () => {
        const loginButtons = document.querySelectorAll(
            "[data-behavior=login-button]"
        );
        Array.from(loginButtons).map((button) => {
            this.setLoading(button);
        });
    }

    displayLoggedOut = () => {
        document.body.className = "display-logged-out";
        this.removeLoader();
    }

    displayLoggedIn = () => {
        document.body.className = "display-logged-in";
        document.location.hash = "home";
        this.removeLoader();
    }

    checkLoggedIn = async () => {
        const loggingInEvent = new CustomEvent("checking-login");
        document.dispatchEvent(loggingInEvent);

        const response = await authFetch(this.USERINFO_URL);
        if (response.status !== 200) {
            const loggedOutEvent = new CustomEvent("logged-out");
            document.dispatchEvent(loggedOutEvent);
            return;
        }
        const loggedInEvent = new CustomEvent("logged-in");
        document.dispatchEvent(loggedInEvent);
    }

    componentDidMount() {

        this.qrcode = new QRCode(document.getElementById("qr-code"));

        this.displayCode = (codeData) => {
            const { code, expireAt } = codeData;
            this.qrcode.clear();
            this.qrcode.makeCode(code);
            const date = new Date(expireAt).toLocaleString();
            const expiry = document.querySelector(
                "#qrcode [data-behavior=qr-code-expiry]"
            );
            expiry.textContent = date;
            console.log("refreshed the code");
        }

        this.displayPincode = (codeData) => {
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
        }

        this.generateCode = async (event, type, emitter) => {
            event.preventDefault();
            let target = event.target
            this.setLoading(target);
            const codeData = await this.getCode(type, emitter);
            const displayer = type === "qrcode" ? this.displayCode : this.displayPincode;
            displayer(codeData);
            this.removeLoader();
            document.location = target.href;
        }

        this.loader = document.createElement("span");
        this.loader.async = true;
        this.loader.className = "loader";
        const loaderImg = document.createElement("img");
        loaderImg.src =
            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' />";
        this.loader.appendChild(loaderImg);

        document.addEventListener("checking-login", (event) => {
            console.log("received checking-login event");
            this.setLoginLoader();
        });

        document.addEventListener("logged-out", (event) => {
            console.log("received logged-out event");
            this.displayLoggedOut(event);
        });

        document.addEventListener("logged-in", (event) => {
            console.log("received logged-in event");
            this.displayLoggedIn(event);
        });

        this.checkLoggedIn();

    }

    render() {

        return (
            <>
            <section id="home" className="section section-white">
            <div className="container">
            <div className="row logged-in">
            <div className="card">
            <div className="card__content">
            <h3>QRCode à flasher immédiatement</h3>
            <p>
            Un QRCode que votre patient diagnostiqué covid+ flashe sur le
            champ avec son application mobile de contact tracing.
            </p>
            </div>
            <div className="card__extra">
            <a href="#qrcode"
            className="button"
            onClick={(event) => this.generateCode(event, 'qrcode', 'doctor')}>
            Générer un QRCode</a>
            </div>
            </div>
            <div className="card">
            <div className="card__content">
            <h3>Code PIN à dicter immédiatement</h3>
            <p>
            En dernier recours, un code à 9 chiffres à dicter à votre
            patient diagnostiqué covid+ qu'il entrera sur son application
            mobile de contact tracing.
            </p>
            </div>
            <div className="card__extra">
            <a
            href="#pincode"
            className="button"
            onClick={(event) => this.generateCode(event, 'pincode', 'doctor')}>
            Générer un Code PIN</a>
            </div>
            </div>
            </div>
            </div>
            </section>

            <section id="qrcode" className="section article article__full">
            <div className="container container-small">
            <h2 className="section__title">
            Votre patient diagnostiqué covid+ peut maintenant flasher ce QR code
            sur son application de contact tracing :
            </h2>
            <div className="code">
            <h2 id="qr-code"></h2>
            expire le <span data-behavior="qr-code-expiry"></span>
            </div>

            <hr />

            <p className="section__subtitle">
            <a
            href="#qrcode"
            className="button large"
            onClick={(event) => this.generateCode(event, 'qrcode', 'doctor')}
            >nouveau QRCode</a
            >
            </p>
            <p>
            <a href="/#home">
            retour à l'accueil
            </a>
            </p>
            </div>
            </section>

            <section id="pincode" className="section section-white">
            <div className="container container-small">
            <h1 className="section__title" id="pin-code"></h1>
            <p className="section__subtitle">
            Ce code PIN de validation est à dicter à votre patient
            immédiatement. Il expire dans
            <span data-behavior="pincode-expiry"></span> secondes.
            </p>
            <hr />

            <p className="section__subtitle">
            <a
            href="#pincode"
            className="button large"
            onClick={(event) => this.generateCode(event, 'pincode', 'doctor')}>
            nouveau code PIN</a>
            </p>
            <p>
            <a href="/#home">
            retour à l'accueil
            </a>
            </p>
            </div>
            </section>
            </>
        )
    }
}

export default MUI_Main
