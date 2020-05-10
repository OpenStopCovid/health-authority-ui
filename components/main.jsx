import { useTranslation } from 'react-i18next';
import React, { useEffect } from "react";

const authFetch = async (url, options) => {

  return fetch(url, {

    credentials: "include",
    ...options,

  });

};

const MUI_Main = (props) => {

    let qrcode = undefined
    let loader = undefined

    const USERINFO_URL = props.USERINFO_URL;
    const CREATECODE_URL = props.CREATECODE_URL;

    const removeLoader = () => {
        const loaderNodes = document.querySelectorAll(".loader");
        const parents = Array.from(loaderNodes).map((loaderNode) => {
            loaderNode.parentNode.removeChild(loaderNode);
        });
    }

    const setLoading = (node) => {
        const loaderNode = loader.cloneNode(true);
        node.appendChild(loaderNode);
    }

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
    }

    const setLoginLoader = () => {
        const loginButtons = document.querySelectorAll(
            "[data-behavior=login-button]"
        );
        Array.from(loginButtons).map((button) => {
            setLoading(button);
        });
    }

    const displayLoggedOut = () => {
        document.body.className = "display-logged-out";
        removeLoader();
    }

    const displayLoggedIn = () => {
        document.body.className = "display-logged-in";
        document.location.hash = "home";
        removeLoader();
    }

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
    }

    // Generate custom context for storing hook-defined functions
    const ctx = {}

    useEffect(() => {

        document.getElementById("qr-code").innerHTML = ''
        qrcode = new QRCode(document.getElementById("qr-code"));

        loader = document.createElement("span");
        loader.async = true;
        loader.className = "loader";
        const loaderImg = document.createElement("img");
        loaderImg.src =
            "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' />";
        loader.appendChild(loaderImg);

        document.addEventListener("checking-login", (event) => {
            //console.log("received checking-login event");
            setLoginLoader();
        });

        document.addEventListener("logged-out", (event) => {
            //console.log("received logged-out event");
            displayLoggedOut(event);
        });

        document.addEventListener("logged-in", (event) => {
            //console.log("received logged-in event");
            displayLoggedIn(event);
        });

        ctx.displayCode = (codeData) => {
            const { code, expireAt } = codeData;
            qrcode.clear();
            qrcode.makeCode(code);
            const date = new Date(expireAt).toLocaleString();
            const expiry = document.querySelector(
                "#qrcode [data-behavior=qr-code-expiry]"
            );
            expiry.textContent = date;
            //console.log("refreshed the code");
        }

        ctx.displayPincode = (codeData) => {
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
            //console.log("refreshed the pincode");
        }

        ctx.generateCode = async (event, type, emitter) => {
            event.preventDefault();
            const target = event.target
            setLoading(target);
            const codeData = await getCode(type, emitter);
            const displayer = type === "qrcode" ? ctx.displayCode : ctx.displayPincode;
            displayer(codeData);
            removeLoader();
            document.location = target.href;
        }

        checkLoggedIn();

    })

    const { t } = useTranslation();

    return (

      <>
        <section id="home" className="section section-white">
          <div className="container">
            <div className="row logged-in">
              <div className="card">
                <div className="card__content">
                  <h3>{t('$flash_label')}</h3>
                  <p>
                    {t('$flash_description_part1')}
                    {t('$flash_description_part2')}.
                  </p>
                </div>
                <div className="card__extra">
                  <a href="#qrcode"
                     className="button"
                     onClick={(event) => ctx.generateCode(event, 'qrcode', 'doctor')}>
                    {t('$qr_generate_button')}</a>
                </div>
              </div>
              <div className="card">
                <div className="card__content">
                  <h3>{t('$dictate_label')}</h3>
                  <p>
                    {t('$dictate_description_part1')}
                    {t('$dictate_description_part2')}
                    {t('$dictate_description_part3')}.
                  </p>
                </div>
                <div className="card__extra">
                  <a href="#pincode"
                     className="button"
                     onClick={(event) => ctx.generateCode(event, 'pincode', 'doctor')}>{t('$pin_generate_button')}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="qrcode" className="section article article__full">
          <div className="container container-small">
            <h2 className="section__title">
              {t('$flash_final_action_part1')}
              {t('$flash_final_action_part2')}&nbsp;:
            </h2>
            <div className="code">
              <h2 id="qr-code"></h2>
              {t('$expire_on')} <span data-behavior="qr-code-expiry"></span>
            </div>

            <hr />

            <p className="section__subtitle">
              <a href="#qrcode"
                 className="button large"
                 onClick={(event) => ctx.generateCode(event, 'qrcode', 'doctor')}>{t('$new_flash')}</a>
            </p>
            <p>
              <a href="/#home">
                {t('$back_button')}
              </a>
            </p>
          </div>
        </section>

        <section id="pincode" className="section section-white">
          <div className="container container-small">
            <h1 className="section__title" id="pin-code"></h1>
            <p className="section__subtitle">
              {t('$dictate_final_action_part1')}
              {t('$dictate_final_action_part2')}&nbsp;
              <span data-behavior="pincode-expiry"></span>&nbsp;{t('$second_plural')}.
            </p>

            <hr />

            <p className="section__subtitle">
              <a href="#pincode"
                 className="button large"
                 onClick={(event) => ctx.generateCode(event, 'pincode', 'doctor')}>
                 {t('$new_pin')}</a>
            </p>
            <p>
              <a href="/#home">
                {t('$back_button')}
              </a>
            </p>
          </div>
        </section>
      </>

    )
}

export default MUI_Main
