import { combineReducers } from 'redux'
import {
    SET_REQUEST_URL,
    PARSE_RESPONSE_URL,
    STORE_AUTH_DATA,
    GET_PLAYBACK_PAYLOAD
} from '../actions/index'

function requestUrl(state = '', action) {
    switch (action.type) {
        case SET_REQUEST_URL: 
            return action.requestUrl
        default: 
            return state
    }
}

function parsedUrlData(state = '', action) {
    switch (action.type) {
        case PARSE_RESPONSE_URL:
            return action.urlData;
        default: 
            return state;
    }
}

function authenticationStatus(state = '', action) {
    switch (action.type) {
        case STORE_AUTH_DATA: 
            return action.success;
        default: 
            return state
    }
}

var playbackPayload = (state = '', action) => {
    switch(action.type) {
        case GET_PLAYBACK_PAYLOAD:
            return action.data;
        default: 
            return state
    }
}

const rootReducer = combineReducers({
    requestUrl,
    parsedUrlData,
    authenticationStatus,
    playbackPayload
})

export default rootReducer