import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
    getSpotifyKey,
    parseResponseUrl
} from '../actions/index';
import RouteHandler from './RouteHandler';

class Charo extends Component {
    constructor(props) {
        super(props);
        props.getSpotifyKey();
        props.parseResponseHashFragment();
    }

    render() {
        return (
            <div className='app-container'>
                <div className='back-header'></div>
                <RouteHandler routeData={this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    requestUrl: state.requestUrl,
    authDataStored: state.authenticationStatus
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getSpotifyKey: () => {
      dispatch(getSpotifyKey());
  },
  parseResponseHashFragment: () => {
      dispatch(parseResponseUrl());
  }
})

Charo.propTypes = {
    requestUrl: PropTypes.string
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Charo)