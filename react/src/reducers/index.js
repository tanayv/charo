import { combineReducers } from 'redux'
import {
    SET_REQUEST_URL,
    PARSE_CURRENT_URL,
    STORE_CURRENT_PLAYBACK,
    PENDING_CURRENT_PLAYBACK,
    AUTH_STORAGE
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
        case PARSE_CURRENT_URL:
            return action.urlData;
        default: 
            return state;
    }
}

function accountConnected(state = false, action) {
    switch (action.type) {
        case PARSE_CURRENT_URL:
            if (action.urlData.access_token != null) {
                return action.urlData.access_token != null
            }
            else
                return state;
        default: 
            return state
    }
}

function currentPlayback(state = '', action) {
    switch (action.type) {
        case PENDING_CURRENT_PLAYBACK: 
            return "Pending";
        case STORE_CURRENT_PLAYBACK:
            return action.playbackData
        default: 
            return state
    }
}

function storeAuthData(state = '', action) {
    switch (action.type) {
        case AUTH_STORAGE: 
            return action.success;
        default: 
            return state
    }
}

const rootReducer = combineReducers({
    requestUrl,
    parsedUrlData,
    accountConnected,
    currentPlayback,
    storeAuthData
})

export default rootReducer