import WatchContext from '../../context/WatchContext'

import './index.css'

const EmptySavedVideosView = () => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const Theme = isDarkTheme ? 'dark-container' : 'light-container'

      return (
        <div className={Theme}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
            alt="saved videos"
            className="saved-videos-image"
          />
          <h1>No saved videos found</h1>
          <p>You can save your videos while watching them</p>
        </div>
      )
    }}
  </WatchContext.Consumer>
)

export default EmptySavedVideosView
