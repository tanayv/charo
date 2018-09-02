import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlbumArt from './../components/AlbumArt';
import Nav from './Nav';
import { 
    getPaybackPayload
} from '../actions/index';

class Player extends Component {

    constructor(props) {
        super(props);
        props.getPlaybackData();
    }


  render() {

    if (this.props.playbackData.spotify) {
        var songTitle = this.props.playbackData.spotify.item.name;
        var albumArtUrl = this.props.playbackData.spotify.item.album.images[0].url;
        var artistName = this.props.playbackData.spotify.item.album.artists[0].name;
    
        return(
            <div className="tile">
                <Nav/>
                <AlbumArt url={albumArtUrl}></AlbumArt>
                <h1 className="song-title">{songTitle}</h1> 
                <h2 className="song-artist">{artistName}</h2>
                <div className="right-panel">
                    <div className="lyrics-container">
                        LYRICS WILL GO HERE
                    </div>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className="tile">
                Loading Song Data
            </div>
        )
    }
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
)(Player)