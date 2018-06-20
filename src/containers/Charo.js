import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
    setRequestUrl,
    parseCurrentUrl
} from '../actions/index';
import RouteHandler from './RouteHandler';

class Charo extends Component {
    constructor(props) {
        super(props);
        props.setRequestUrl();
        props.parseCurrentUrl();
        
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
    parsedUrlData: state.parsedUrlData,
    accountConnected: state.accountConnected
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setRequestUrl: () => {
      dispatch(setRequestUrl());
  },
  parseCurrentUrl: () => {
      dispatch(parseCurrentUrl());
  }
})

Charo.propTypes = {
    requestUrl: PropTypes.string
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Charo)