import React, { Component } from 'react';

export default class AlbumArt extends Component {

    shouldComponentUpdate() {
        return true;
    }

    render() {
        return (
            <div className="album-art" style={{
                backgroundImage: 'url(' + this.props.url + ')',
            }}></div>
        )
    }

}