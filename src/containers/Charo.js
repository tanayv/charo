import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
    setRequestUrl
} from '../actions/index';
import RouteHandler from './RouteHandler';

class Charo extends Component {
    constructor(props) {
        super(props);
        props.setRequestUrl(props.requestUrl);
    }

    render() {
        return (
            <div className='app-container'>
                <RouteHandler requestUrl={this.props.requestUrl}/>
            </div>
        )
    }
}



const mapStateToProps = (state, ownProps) => ({
    requestUrl: state.requestUrl
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setRequestUrl: () => {
      dispatch(setRequestUrl());
  }
})

Charo.propTypes = {
    requestUrl: PropTypes.string
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Charo)