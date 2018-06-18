import { combineReducers } from 'redux'
import {
    SET_REQUEST_URL
} from '../actions/index'

function requestUrl(state = '', action) {
    switch (action.type) {
        case SET_REQUEST_URL: 
            return action.requestUrl
        default: 
            return state
    }
}

const rootReducer = combineReducers({
    requestUrl
})

export default rootReducer