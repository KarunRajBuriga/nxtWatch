import {BsSearch} from 'react-icons/bs'
import {ImCross} from 'react-icons/im'
import WatchContext from '../../context/WatchContext'
import './index.css'
import {BannerContainer} from './styledComponents'

const BannerFilter = props => (
  <WatchContext.Consumer>
    {value => {
      const {showBanner, toggleShowBanner} = value
      const onEnterSearchInput = event => {
        const {enterSearchInput} = props
        if (event.key === 'Enter') {
          enterSearchInput()
        }
      }

      const onClickSearch = () => {
        const {enterSearchInput} = props
        enterSearchInput()
      }

      const onChangeSearchInput = event => {
        const {changeSearchInput} = props
        changeSearchInput(event.target.value)
      }

      const renderSearchInput = () => {
        const {searchInput} = props
        return (
          <div className="search-input-container">
            <input
              value={searchInput}
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={onChangeSearchInput}
              onKeyDown={onEnterSearchInput}
            />
            <button
              data-testid="searchButton"
              type="button"
              onClick={onClickSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
        )
      }

      const onClickCross = () => {
        toggleShowBanner()
      }

      const appLogo =
        'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
      return (
        <div className="banner-filter-container">
          {showBanner ? (
            <BannerContainer data-testid="banner">
              <div className="banner-details">
                <img src={appLogo} alt="nxt watch logo" className="app-logo" />
                <p className="paragraph">
                  Buy Nxt Watch Premium prepaid plans with UPI
                </p>
                <button type="button" className="get-it-now-button">
                  GET IT NOW
                </button>
              </div>

              <button
                type="button"
                onClick={onClickCross}
                className="banner-control-button"
                data-testid="close"
              >
                <ImCross className="cross-icon" />
              </button>
            </BannerContainer>
          ) : null}
          {renderSearchInput()}
        </div>
      )
    }}
  </WatchContext.Consumer>
)
export default BannerFilter
