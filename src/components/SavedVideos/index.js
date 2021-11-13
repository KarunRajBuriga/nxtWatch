import WatchContext from '../../context/WatchContext'
import Header from '../Header'
import SideBar from '../SideBar'
import EmptySavedVideosView from '../EmptySavedVideosView'
import SavedListView from '../SavedListView'
import './index.css'

const SavedVideos = () => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme, savedVideosList} = value
      const showEmptyView = savedVideosList.length === 0

      const Theme = isDarkTheme ? 'dark-container' : 'light-container'

      return (
        <div className="nxt-watch-home-container">
          <Header />
          <div className="sidebar-body-container">
            <SideBar />
            <div className={`main-container ${Theme}`}>
              {showEmptyView ? (
                <EmptySavedVideosView />
              ) : (
                <>
                  <h1 className="cart-heading">Saved Videos</h1>
                  <SavedListView />
                </>
              )}
            </div>
          </div>
        </div>
      )
    }}
  </WatchContext.Consumer>
)

export default SavedVideos
