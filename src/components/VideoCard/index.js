import {Link} from 'react-router-dom'
import WatchContext from '../../context/WatchContext'

import './index.css'

const VideoCard = props => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {videoData} = props
      const {
        id,
        title,
        publishedAt,
        thumbnailUrl,
        viewCount,
        channelName,
        channelProfileImageUrl,
      } = videoData

      const cardContainer = isDarkTheme ? 'dark-container' : 'light-container'
      return (
        <li className={`video-item card-container ${cardContainer}`}>
          <Link to={`/videos/${id}`} className="link-item">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="thumbnail-image"
            />
            <div className="video-logo-details-container">
              <div>
                <img
                  src={channelProfileImageUrl}
                  alt="channel logo"
                  className="channel-logo"
                />
              </div>
              <div className="details-container">
                <p className={`title ${cardContainer}`}>{title}</p>
                <p className={`channel-name ${cardContainer}`}>{channelName}</p>
                <div className="container">
                  <p className={`published ${cardContainer}`}>
                    {viewCount} views .
                  </p>
                  <p className={`published ${cardContainer}`}>
                    {} {publishedAt}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </li>
      )
    }}
  </WatchContext.Consumer>
)

export default VideoCard
