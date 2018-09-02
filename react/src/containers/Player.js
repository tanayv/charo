import React, { Component } from 'react';
import { connect } from 'react-redux';
import AlbumArt from './../components/AlbumArt';

class Player extends Component {


  render() {
    var songTitle = "";
    var albumArtUrl = "";
    var artistName = "";

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
    
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player)