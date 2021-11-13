import WatchContext from '../../context/WatchContext'
import './index.css'

const SavedVideoItem = props => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const Theme = isDarkTheme ? 'dark-container' : 'light-container'

      const {videoItemDetails} = props
      const {
        channelName,
        thumbnailUrl,
        title,
        viewCount,
        publishedAt,
      } = videoItemDetails

      return (
        <div className={`saved-item-container ${Theme}`}>
          <img src={thumbnailUrl} alt="saved video" className="thumbnail" />
          <div>
            <h1>{title}</h1>
            <p>{channelName}</p>
            <div>
              <p>{viewCount} views</p>
              <p>{publishedAt}</p>
            </div>
          </div>
        </div>
      )
    }}
  </WatchContext.Consumer>
)

export default SavedVideoItem
