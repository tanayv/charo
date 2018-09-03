import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    getPaybackPayload
} from '../actions/index';

class Lyrics extends Component {
    render() {
        return(
            <div class="lyrics-container">
                {this.props.playbackData.lyrics}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    playbackData: state.playbackPayload
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getPlaybackData: () => {
        dispatch(getPaybackPayload());
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lyrics)