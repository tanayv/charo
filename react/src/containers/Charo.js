import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
    setRequestUrl,
    parseResponseUrl
} from '../actions/index';
import RouteHandler from './RouteHandler';

class Charo extends Component {
    constructor(props) {
        super(props);
        props.setRequestUrl();
        props.parseResponseHashFragment();
    }

    render() {
        return (
            <div className='app-container'>
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
  setRequestUrl: () => {
      dispatch(setRequestUrl());
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