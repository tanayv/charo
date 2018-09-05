import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlbumArt from './../components/AlbumArt';
import Nav from './Nav';
import { 
    getPaybackPayload
} from '../actions/index';
import Lyrics from './Lyrics';
import Translation from './Translation';

class Player extends Component {

    constructor(props) {
        super(props);
        props.getPlaybackData();
    }

    render() {

        if (this.props.view === 0) {
            if (this.props.playbackData.spotify) {
                var songTitle = this.props.playbackData.spotify.item.name;
                var albumArtUrl = this.props.playbackData.spotify.item.album.images[0].url;
                var artistName = this.props.playbackData.spotify.item.album.artists[0].name;
            
                return(
                    <div className="tile">
                        <Nav/>
                        <div class="player-container">
                            <AlbumArt url={albumArtUrl}></AlbumArt>
                            <h1 className="song-title">{songTitle}</h1> 
                            <h2 className="song-artist">{artistName}</h2>
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

        else if (this.props.view === 1) {
            return(
                <div className="tile">
                    <Nav/>
                    <Lyrics/>
                </div>
            )
        }

        else if (this.props.view === 2) {
            return(
                <div className="tile">
                    <Nav/>
                    <Translation/>
                </div>
            )
        }

        else {
            return(
                <div className="tile">
                    Ya I messed up somewhere thanks
                </div>
            )
        }
  }
}


const mapStateToProps = (state, ownProps) => ({
    playbackData: state.playbackPayload,
    view: state.activeView
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