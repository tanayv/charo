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
        
        return(
            
            <div className="translation">
                {data}
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