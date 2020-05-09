import { useState } from "react";
import MUI_Title from './title'
import MUI_Login, {MUI_LoginHead} from './login'

const MUI_Header = (props) => {

    const [lang, setLang] = useState(props.lang);

    const changeLang = (event) => {
        props.setLang(event.target.value)
        setLang(event.target.value)
    }

    return(

       <header className="navbar" role="navigation">
        <div className="navbar__container">
            <select value={lang} onChange={changeLang}>
            {props.langs.map((value, index) => { return <option key={index} value={value}>{value}</option>})}
            </select>
           <MUI_Title></MUI_Title>
           <MUI_LoginHead LOGIN_URL={props.LOGIN_URL} LOGOUT_URL={props.LOGOUT_URL}></MUI_LoginHead>
        </div>
       </header>

    )

}

export default MUI_Header
