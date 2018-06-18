import React, { Component } from 'react'

export default class Login extends Component {

  constructor(props) {
      super(props);
      this.performRedirect = this.performRedirect.bind(this); 
  }

  render() {
    return (
        <div className="login-tile">
            <h1>To use Charo, log in to your Spotify account</h1>
            <button className="button purple" onClick={this.performRedirect}>Login</button>
        </div>
    )
  }

  performRedirect() {
      window.location.assign(this.props.requestUrl);
  }
}