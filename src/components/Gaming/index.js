import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {IoLogoGameControllerB} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import WatchContext from '../../context/WatchContext'

import Header from '../Header'
import SideBar from '../SideBar'
import GamingVideoCard from '../GamingVideoCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))

      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderVideosListView = () => (
    <WatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {videosList} = this.state
        const appContainer = isDarkTheme ? 'dark-container' : 'light-container'

        const shouldShowVideosList = videosList.length > 0

        return shouldShowVideosList ? (
          <div className={`all-videos-container ${appContainer}`}>
            <div>
              <div className={`gaming-icon-heading ${appContainer}`}>
                <IoLogoGameControllerB className="body-icon" />
                <h1>Gaming</h1>
              </div>
              <ul className="videos-list">
                {videosList.map(video => (
                  <GamingVideoCard videoData={video} key={video.id} />
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
              alt="no videos"
            />
            <h1>No Search result found</h1>
            <p>Try different key words or remove search filter</p>
            <button type="button" onClick={this.getVideos()}>
              Retry
            </button>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )

  renderLoadingView = () => (
    <div className="videos-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <WatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const failureImage = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div className="videos-error-view-container">
            <img
              src={failureImage}
              alt="failure view"
              className="videos-failure-img"
            />
            <h1 className="videos-failure-heading-text">
              Oops! Something Went Wrong
            </h1>
            <p className="videos-failure-description">
              We are having some trouble processing your request. Please try
              again.
            </p>
            <button type="button">Retry</button>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )

  renderAllVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="nxt-watch-home-container">
        <Header />
        <div className="sidebar-body-container">
          <SideBar />
          {this.renderAllVideos()}
        </div>
      </div>
    )
  }
}
export default Gaming
