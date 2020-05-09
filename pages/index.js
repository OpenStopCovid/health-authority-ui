import MUI_Head from '../components/head'
import MUI_Header from '../components/header'
import MUI_SectionTitle from '../components/section_title'
import MUI_Main from '../components/main'
import MUI_Footer from '../components/footer'

import { useState } from "react";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";

//-------- API ENDPOINTS -----------------------------------//
//LOGIN_URL --
const LOGIN_URL = "http://localhost:5000/login/";
//LOGOUT_URL --
const LOGOUT_URL = "http://localhost:5000/logout/";
//USERINFO_URL --
const USERINFO_URL = "http://localhost:5000/user-info/";
//CREATECODE_URL --
const CREATECODE_URL = "http://localhost:5000/create-code/";
//-------- API ENDPOINTS -----------------------------------//

const lang_pack = {
    "dummy": {
        "translation": {}
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources: lang_pack,
        lng: Object.keys(lang_pack)[0],
        fallbackLng: Object.keys(lang_pack)[1],
        interpolation: {
            escapeValue: false
        }
    });

export default function Home() {

    const [lang, setLang] = useState(Object.keys(lang_pack)[0]);

    const changeLang = (lang) => {

        i18n.changeLanguage(lang, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
        });

    }

    return (

        <>
        <MUI_Head></MUI_Head>
        <MUI_Header LOGIN_URL={LOGIN_URL} LOGOUT_URL={LOGOUT_URL} lang={lang} setLang={changeLang} langs={Object.keys(lang_pack)}></MUI_Header>
        <MUI_SectionTitle LOGIN_URL={LOGIN_URL} LOGOUT_URL={LOGOUT_URL}></MUI_SectionTitle>
        <MUI_Main USERINFO_URL={USERINFO_URL} CREATECODE_URL={CREATECODE_URL}></MUI_Main>
        <MUI_Footer></MUI_Footer>
        </>
    )
}
