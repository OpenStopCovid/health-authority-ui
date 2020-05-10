import Link from 'next/link'
import { useTranslation } from 'react-i18next';

const MUI_LoginHead = (props) => {

    const login = (event) => {

        event.preventDefault();
        // Redirect to the login page
        document.location = props.LOGIN_URL;

    };

    const logout = (event) => {

        event.preventDefault();
        // Redirect to the logout page
        document.location = props.LOGOUT_URL;

    };

    const { t } = useTranslation();

    return (

        <nav>
          <ul className="nav__links">
            <li className="nav__item logged-out">
              <Link href="#">
                <a 
                  className="button"
                  onClick={login}
                  data-behavior="login-button">
                  {t('$connect_button')}
                </a>
              </Link>
            </li>
            <li className="nav__item logged-in">
              <div className="dropdown">
                  {t('$connected_label')}
                <div className="dropdown-content">
                  <Link href="#">
                    <a onClick={logout}>{t('$disconnect_button')}</a>
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </nav>

    )
}

const MUI_LoginSection = (props) => {

    const login = (event) => {

        event.preventDefault();
        // Redirect to the login page
        document.location = props.LOGIN_URL;

    };

    const { t } = useTranslation();

    return (

        <div className="section__subtitle logged-out">
          <Link href="#">
          <a onClick={login}
            className="button"
            data-behavior="login-button">
            {t('$connect_label')}
            </a>
          </Link>
        </div>

    )
}

export default MUI_LoginHead

export {

    MUI_LoginHead,
    MUI_LoginSection

}
