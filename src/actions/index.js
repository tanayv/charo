export const START_AUTHORIZATION_REQUEST = 'START_AUTHORIZATION_REQUEST';
export const RECEIVE_HASH_FRAGMENT = 'RECEIVE_HASH_FRAGMENT';

export function startLogin() {
    console.log("Starting Login");
    return dispatch => {
        dispatch(startAuthorizationRequest());
    }
}


/** Basically the capitalized actions defined as functions with an optional extra return value */

export function startAuthorizationRequest() {
    return {
        type: START_AUTHORIZATION_REQUEST,
        loginStarted: true
    }
};