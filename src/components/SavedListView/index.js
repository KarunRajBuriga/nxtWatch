import WatchContext from '../../context/WatchContext'
import SavedVideoItem from '../SavedVideoItem'
import './index.css'

const SavedListView = () => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme, savedVideosList} = value

      const Theme = isDarkTheme ? 'dark-container' : 'light-container'

      return (
        <div className={`videos-container ${Theme}`}>
          <ul className="videos-list">
            {savedVideosList.map(eachItem => (
              <SavedVideoItem
                key={eachItem.videosData.id}
                videoItemDetails={eachItem.videosData}
              />
            ))}
          </ul>
        </div>
      )
    }}
  </WatchContext.Consumer>
)

export default SavedListView
