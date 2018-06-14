import { combineReducers } from 'redux'
import {
    RECEIVE_HASH_FRAGMENT,
    START_AUTHORIZATION_REQUEST,
} from '../actions/index'

function parsedHashFragment(state = '', action) {
    switch (action.type) {
        case RECEIVE_HASH_FRAGMENT:
            return action.hashFragment
        default:
            return state
    } 
}

function startLogin(state = '', action) {
    switch(action.type) {
        case START_AUTHORIZATION_REQUEST:
            return action.loginStarted;
        default:
            return state
    }
}

const rootReducer = combineReducers({
    parsedHashFragment,
    startLogin
})

export default rootReducer