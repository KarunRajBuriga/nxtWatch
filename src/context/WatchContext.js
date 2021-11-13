import React from 'react'

const WatchContext = React.createContext({
  savedVideosList: [],
  isDarkTheme: false,
  toggleTheme: () => {},
  showBanner: true,
  toggleShowBanner: () => {},
  addToSavedVideos: () => {},
  removeVideo: () => {},
})

export default WatchContext
