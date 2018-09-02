import React, { Component } from 'react'
import Login from './../components/Login'
import Player from './Player';

export default class RouteHandler extends Component {

  render() {
    if (this.props.routeData.authDataStored) {
        return (
            <Player/>
        )
    }
    else
        return (
            <Login requestUrl={this.props.routeData.requestUrl}/>
        )

  }
}