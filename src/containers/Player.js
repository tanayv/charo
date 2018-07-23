import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    getCurrentPlayback
} from '../actions/index';
import AlbumArt from './../components/AlbumArt';

class Player extends Component {

    /** This view is displayed after the authorization is complete so we can start making Spotify calls I think  */

    constructor(props) {
        super(props);
        props.getCurrentPlayback(props.accessToken);

    }

  render() {

    var songTitle = "";
    var albumArtUrl = "";
    var artistName = "";
    if (this.props.playback.item) {
        console.log(this.props.playback)
        songTitle = <h1 className="song-title">{this.props.playback.item.name}</h1>;
        albumArtUrl = this.props.playback.item.album.images[1].url;
        artistName = <h2 className="artist-name">{this.props.playback.item.album.artists[0].name}</h2>
    }
    

    return(
        <div className="player-container">
            <div className="left-panel">
                <AlbumArt url={albumArtUrl}></AlbumArt>
                {songTitle} {artistName}
            </div>
            <div className="right-panel">
                <div className="lyrics-container">
                </div>
                <div className="lyrics-container">
                </div>
            </div>
        </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
    accessToken: state.parsedUrlData.access_token,
    playback: state.currentPlayback
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getCurrentPlayback: (accessToken) => {
        console.log("DISPATCHED");
        dispatch(getCurrentPlayback(accessToken));
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player)