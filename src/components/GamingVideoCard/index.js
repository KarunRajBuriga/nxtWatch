import {Link} from 'react-router-dom'
import WatchContext from '../../context/WatchContext'

import './index.css'

const GamingVideoCard = props => (
  <WatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {videoData} = props
      const {id, title, thumbnailUrl, viewCount} = videoData

      const cardContainer = isDarkTheme ? 'dark-container' : 'light-container'
      return (
        <li className={`video-item card-container ${cardContainer}`}>
          <Link to={`/videos/${id}`} className="link-item">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="thumbnail-image"
            />
            <div className="logo-details-container">
              <p className={`title ${cardContainer}`}>{title}</p>
              <p className={`view-count ${cardContainer}`}>
                {viewCount} Watching Worldwide
              </p>
            </div>
          </Link>
        </li>
      )
    }}
  </WatchContext.Consumer>
)

export default GamingVideoCard
