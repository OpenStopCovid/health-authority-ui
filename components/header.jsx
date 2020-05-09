import MUI_Login, {MUI_LoginHead} from './login'
import MUI_Title from './title'


const MUI_Header = () => {

    return(
       <header className="navbar" role="navigation">
        <div className="navbar__container">
           <MUI_Title></MUI_Title>
           <MUI_LoginHead LOGIN_URL={props.LOGIN_URL} LOGOUT_URL={props.LOGOUT_URL}></MUI_LoginHead>
        </div>
       </header>
    )

}


export default MUI_Header
