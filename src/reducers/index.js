import { combineReducers } from 'redux'
import {
    SET_REQUEST_URL,
    PARSE_CURRENT_URL
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
            return action.urlData.access_token != null
        default: 
            return state
    }
}

const rootReducer = combineReducers({
    requestUrl,
    parsedUrlData,
    accountConnected
})

export default rootReducer