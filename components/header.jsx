import MUI_Login, {MUI_LoginHead} from './login'
import MUI_Title from './title'


const MUI_Header = () => {

    return(
       <header className="navbar" role="navigation">
        <div className="navbar__container">
           <MUI_Title></MUI_Title>
           <MUI_LoginHead></MUI_LoginHead>
        </div>
       </header>
    )

}


export default MUI_Header
