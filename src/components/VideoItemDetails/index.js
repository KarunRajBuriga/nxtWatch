import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {RiMenuAddFill} from 'react-icons/ri'
import ReactPlayer from 'react-player'
import WatchContext from '../../context/WatchContext'
import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosData: {},
    isPlaying: false,
  }

  componentDidMount() {
    this.getVideoData()
  }

  getFormattedData = data => ({
    channelName: data.channel.name,
    channelProfileImage: data.channel.profile_image_url,
    channelSubscriberCount: data.channel.subscriber_count,
    id: data.id,
    description: data.description,
    publishedAt: data.published_at,
    thumbnailUrl: data.thumbnail_url,
    title: data.title,
    videoUrl: data.video_url,
    viewCount: data.view_count,
  })

  getVideoData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.video_details)
      this.setState({
        videosData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="video-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <WatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const Theme = isDarkTheme ? 'dark-container' : 'light-container'
        const FailureImage = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

        return (
          <div className={`video-details-error-view-container ${Theme}`}>
            <img
              alt="error view"
              src={FailureImage}
              className="error-view-image"
            />
            <h1 className="video-not-found-heading">Page Not Found</h1>
            <Link to="/home">
              <button type="button" className="button">
                Retry
              </button>
            </Link>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )

  renderVideoDetailsView = () => (
    <WatchContext.Consumer>
      {value => {
        const {videosData, isPlaying} = this.state
        const {
          channelName,
          channelProfileImage,
          channelSubscriberCount,
          description,
          publishedAt,
          title,
          videoUrl,
          viewCount,
        } = videosData
        const {isDarkTheme, addToSavedVideos} = value

        const ThemeContainer = isDarkTheme
          ? 'dark-container'
          : 'light-container'

        const onClickSave = () => {
          addToSavedVideos({videosData})
        }

        const published = formatDistanceToNow(new Date(publishedAt))

        return (
          <div className={`video-container ${ThemeContainer}`}>
            <div className="video-player-container">
              <ReactPlayer
                url={videoUrl}
                playing={isPlaying}
                width="90%"
                height="55vh"
              />
            </div>

            <div className="video-details-container">
              <p className="title">{title}</p>
              <div className="views-time-like-share-container">
                <div className="views-time-container">
                  <p className="view-count">{viewCount} views .</p>
                  <p className="published-time">{published}</p>
                </div>
                <div className="like-share-container">
                  <div className="icon-container">
                    <AiOutlineLike />
                    <button type="button" className="reaction-type">
                      Like
                    </button>
                  </div>
                  <div className="icon-container">
                    <AiOutlineDislike />
                    <button type="button" className="reaction-type">
                      Dislike
                    </button>
                  </div>
                  <div className="icon-container">
                    <RiMenuAddFill />
                    <button
                      type="button"
                      className="reaction-type"
                      onClick={onClickSave}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <div className="hr">
                <hr />
              </div>

              <div className="logo-channel-name-subscribers-container">
                <img
                  src={channelProfileImage}
                  alt="channel logo"
                  className="channel-name-logo"
                />
                <div className="name-subscribers-count-container">
                  <p className="channel-name">{channelName}</p>
                  <p className="subscribers-count">
                    {channelSubscriberCount} subscribers
                  </p>
                  <p className="description">{description}</p>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )

  renderVideoDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="nxt-watch-container">
        <Header />
        <div className="sidebar-body-container">
          <SideBar />
          {this.renderVideoDetails()}
        </div>
      </div>
    )
  }
}

export default VideoItemDetails
