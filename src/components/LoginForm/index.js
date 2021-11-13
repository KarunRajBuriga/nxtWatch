import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'
import WatchContext from '../../context/WatchContext'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  changeType = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  showPasswordField = () => (
    <>
      <input type="checkbox" id="showPassword" onChange={this.changeType} />
      <label htmlFor="showPassword">Show Password</label>
    </>
  )

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const themeContainer = isDarkTheme
            ? 'dark-container'
            : 'light-container'
          return (
            <div className={`login-form-container ${themeContainer}`}>
              <form className="form-container" onSubmit={this.submitForm}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  className="login-website-logo-desktop-image"
                  alt="website logo"
                />
                <div className="input-container">
                  {this.renderUsernameField()}
                </div>
                <div className="input-container">
                  {this.renderPasswordField()}
                </div>
                <div className="show-password-input-container">
                  {this.showPasswordField()}
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
                {showSubmitError && (
                  <p className="error-message">*{errorMsg}</p>
                )}
              </form>
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default LoginForm
