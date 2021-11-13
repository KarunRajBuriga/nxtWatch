import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import WatchContext from '../../context/WatchContext'

import './index.css'

const Header = props => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const onToggleTheme = () => {
        toggleTheme()
      }

      const appLogo = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const themeImageURL = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'

      const navbarLogoutButton = isDarkTheme
        ? 'navbar-dark-button'
        : 'navbar-light-button'

      const navbarBgContainer = isDarkTheme
        ? 'navbar-container-dark'
        : 'navbar-container-light'

      return (
        <div className={`navbar ${navbarBgContainer}`}>
          <Link to="/">
            <img src={appLogo} alt="website logo" className="logo-image" />
          </Link>
          <div className="icon-user-button-container">
            <button
              data-testid="theme"
              className="theme-button"
              type="button"
              onClick={onToggleTheme}
            >
              <img className="theme-image" src={themeImageURL} alt="theme" />
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
              alt="profile"
              className="profile-logo-image"
            />
            <button
              type="button"
              onClick={onClickLogout}
              className={`nav-logout-button ${navbarLogoutButton}`}
            >
              Logout
            </button>
          </div>
        </div>
      )
    }}
  </WatchContext.Consumer>
)

export default withRouter(Header)
