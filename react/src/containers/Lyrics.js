import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    getPaybackPayload
} from '../actions/index';


class Lyrics extends Component {

    render() {

        return(

            <div className="lyricist">
                <div className="embed-layer"
                dangerouslySetInnerHTML={{__html: this.props.lyrics}}>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    lyrics: state.playbackPayload.lyrics
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