import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import WatchContext from './context/WatchContext'
import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
    showBanner: true,
    savedVideosList: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  toggleShowBanner = () => {
    this.setState(prevState => ({
      showBanner: !prevState.showBanner,
    }))
  }

  addToSavedVideos = video => {
    const {savedVideosList} = this.state
    const savedObject = savedVideosList.find(
      eachSavedItem => eachSavedItem.id === video.id,
    )

    if (savedObject === undefined) {
      const updatedVideosList = [...savedVideosList, video]
      console.log(updatedVideosList)

      this.setState({savedVideosList: updatedVideosList})
    }
  }

  render() {
    const {isDarkTheme, showBanner, savedVideosList} = this.state
    return (
      <WatchContext.Provider
        value={{
          isDarkTheme,
          showBanner,
          savedVideosList,
          toggleTheme: this.toggleTheme,
          toggleShowBanner: this.toggleShowBanner,
          addToSavedVideos: this.addToSavedVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </WatchContext.Provider>
    )
  }
}

export default App
