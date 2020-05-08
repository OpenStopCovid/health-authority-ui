import Link from 'next/link'

//LOGIN_URL --
const LOGIN_URL = "http://localhost:5000/login/";
const login = (event) => {
  event.preventDefault();
  // Redirect to the login page
  document.location = LOGIN_URL;
};

//LOGOUT_URL --
const LOGOUT_URL = "http://localhost:5000/logout/";
const logout = (event) => {
  event.preventDefault();
  // Redirect to the logout page
  document.location = LOGOUT_URL;
};

const MUI_Login = () => {
    return (
        <>
        <MUI_LoginHead></MUI_LoginHead>
        </>
    )
}

const MUI_LoginHead = () => {

    return (
        <nav>
          <ul className="nav__links">
            <li className="nav__item logged-out">
              <Link href="#">
                <a 
                  className="button"
                  onClick={login}
                  data-behavior="login-button">
                  Se connecter
                </a>
              </Link>
            </li>
            <li className="nav__item logged-in">
              <div className="dropdown">
                  Connecté
                <div className="dropdown-content">
                  <Link href="#">
                    <a onClick={logout}>déconnexion</a>
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </nav>
    )
}

const MUI_LoginSection = () => {
    return (
        <div className="section__subtitle logged-out">
          <Link href="#">
          <a onClick={login}
            className="button"
            data-behavior="login-button">
            Se connecter pour générer un code de validation
            </a>
          </Link>
        </div>
    )
}

export default MUI_Login
export {
    MUI_LoginHead,
    MUI_LoginSection
}
