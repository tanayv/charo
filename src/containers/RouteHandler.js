import React, { Component } from 'react'
import Login from './../components/Login'


export default class RouteHandler extends Component {

  render() {
    return (
        <Login requestUrl={this.props.requestUrl}/>
    )
  }
}