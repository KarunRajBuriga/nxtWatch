import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FaFire} from 'react-icons/fa'
import {IoLogoGameControllerB} from 'react-icons/io'
import {RiPlayListAddLine} from 'react-icons/ri'
import WatchContext from '../../context/WatchContext'

import './index.css'

const SideBar = () => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const sideBarContainer = isDarkTheme ? 'dark-theme' : 'light-theme'

      return (
        <div className={`sidebar ${sideBarContainer}`}>
          <div className={`sidebar-header ${sideBarContainer}`}>
            <ul className="nav-menu-lists">
              <li className="nav-menu-item">
                <Link to="/" className="nav-link">
                  <button
                    type="button"
                    className={`sidebar-element-container ${sideBarContainer}`}
                  >
                    <AiFillHome className="sidebar-icon" />
                    <p>Home</p>
                  </button>
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/trending" className="nav-link">
                  <button
                    type="button"
                    className={`sidebar-element-container ${sideBarContainer}`}
                  >
                    <FaFire className="sidebar-icon" />
                    <p>Trending</p>
                  </button>
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/gaming" className="nav-link">
                  <button
                    type="button"
                    className={`sidebar-element-container ${sideBarContainer}`}
                  >
                    <IoLogoGameControllerB className="sidebar-icon" />
                    <p>Gaming</p>
                  </button>
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link to="/saved-videos" className="nav-link">
                  <button
                    type="button"
                    className={`sidebar-element-container ${sideBarContainer}`}
                  >
                    <RiPlayListAddLine className="sidebar-icon" />
                    <p>Saved videos</p>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebar-footer">
            <p>Contact us</p>
            <div className="social-media-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="social-media-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="social-media-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="social-media-logo"
              />
            </div>
            <p className="final-para">
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </WatchContext.Consumer>
)

export default SideBar
