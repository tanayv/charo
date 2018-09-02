import React, { Component } from 'react'

export default class Nav extends Component {

  render() {
    return(
      <div className="nav">
          <div className="option">Playback</div>
          <div className="option">Lyrics</div>
          <div className="option">Translation</div>
      </div>
    )
  }
}