import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    getPaybackPayload
} from '../actions/index';

class Translation extends Component {

    render() {

        
        return(
            <div className="translation">
                {this.props.translation}
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    translation: state.playbackPayload.translation
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getPlaybackData: () => {
        dispatch(getPaybackPayload());
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Translation)