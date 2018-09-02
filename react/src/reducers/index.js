import { combineReducers } from 'redux'
import {
    SET_REQUEST_URL,
    PARSE_CURRENT_URL,
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
    storeAuthData
})

export default rootReducer