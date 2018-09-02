import React, { Component } from 'react'

export default class Login extends Component {

  constructor(props) {
      super(props);
      this.performRedirect = this.performRedirect.bind(this); 
  }

  render() {
    return (
        <div className="tile">
            <h1>Login with your Spotify account</h1>
            <button className="button purple" onClick={this.performRedirect}>Connect</button>
        </div>
    )
  }

  performRedirect() {
      window.location.assign(this.props.requestUrl);
  }
}