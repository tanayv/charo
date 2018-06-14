import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { 
    startLogin
} from '../actions/index';

class Charo extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div onClick={this.handleClick}>Charo Life</div>
        )
    }

    handleClick() {
        console.log("Wassa");
        this.props.loginPutain();
    }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  startLogin: () => {
    dispatch(startLogin());
  }
  
})

Charo.propTypes = {
    startLogin: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Charo)