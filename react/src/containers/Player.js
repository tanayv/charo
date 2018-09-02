import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlbumArt from './../components/AlbumArt';
import { 
    getPaybackPayload
} from '../actions/index';

class Player extends Component {

    constructor(props) {
        super(props);
        props.getPlaybackData();
    }


  render() {
    var songTitle = "";
    var albumArtUrl = "";
    var artistName = "";
    console.log(this.props.playbackData);

    return(
        <div className="player-container">
            <div className="left-panel">
                <AlbumArt url={albumArtUrl}></AlbumArt>
                {songTitle} {artistName}
            </div>
            <div className="right-panel">
                <div className="lyrics-container">
                    LYRICS WILL GO HERE
                </div>
            </div>
        </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
    playbackData: state.playbackPayload
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getPlaybackData: () => {
        console.log("Player.js has made request to fetch playback by dispatching action");
        dispatch(getPaybackPayload());
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player)