import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    getPaybackPayload
} from '../actions/index';

class Translation extends Component {

    render() {

        var data = this.props.translation.map((item) => {
            return (<div class="lyric">
                {item.original}<br/>
                <b>{item.translation}</b>
            </div>)
        });
        
        if (data.length > 0)
            return(
                <div className="translation">
                    {data}
                </div>
            )
        else 
            return(
                <div className="translation">
                    <div class="loading-container">
                        <div className="matuidi-charo">
                        </div>
                        <p>Could not translate lyrics</p>
                    </div>
                </div>
            )
    }

}

const mapStateToProps = (state) => ({
    translation: state.playbackPayload.translation
})

const mapDispatchToProps = (dispatch) => ({
    getPlaybackData: () => {
        dispatch(getPaybackPayload());
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Translation)