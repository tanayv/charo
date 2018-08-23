
import axios from 'axios';

export const SET_REQUEST_URL = 'SET_REQUEST_URL';
export const PARSE_CURRENT_URL = 'PARSE_CURRENT_URL';

export const GET_CURRENT_PLAYBACK = 'GET_CURRENT_PLAYBACK';
export const PENDING_CURRENT_PLAYBACK = 'PENDING_CURRENT_PLAYBACK'
export const STORE_CURRENT_PLAYBACK = 'STORE_CURRENT_PLAYBACK';

export const REQUEST_FAILED = 'REQUEST_FAILED';

export const AUTH_STORAGE = 'AUTH_STORAGE';

/** Basically the capitalized actions defined as functions with an optional extra return value */

export function setRequestUrl() {
    var loginConfig = {
        "baseUrl": "https://accounts.spotify.com/authorize",
        "urlParams": {
            "client_id": "804e43256299432b8e9401998ec9e22b",
            "redirect_uri": "http://localhost:8000/auth/callback/",
            "scope": "user-read-currently-playing user-read-playback-state",
            "response_type": "token",
            "state": "6716F7FB8B9185A504B97FFAB87720B90D5E0CFCA48978A3827126F382D2093D"
        }
    }
    var out = [];
    for (var key in loginConfig.urlParams) {
        out.push(key + '=' + encodeURIComponent(loginConfig.urlParams[key]));
    }
    var requestUrl = loginConfig.baseUrl + "?" + out.join('&');
    console.log(loginConfig);
    return {
        type: SET_REQUEST_URL,
        requestUrl: requestUrl
    }

}

export function parseCurrentUrl() {
    
    var url = window.location.href;

    var queryStart = url.indexOf("#") + 1,
        queryEnd   = url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        data = {}, i, n, v, nv;

    if (query === url || query === "") 
    return {
        type: PARSE_CURRENT_URL,
        urlData: []
    };;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!data.hasOwnProperty(n)) data[n] = [];
        data[n].push(nv.length === 2 ? v : null);
    }
    
    /** Some way to leave the application or make a POST request to the API */
    
    return (dispatch) => {
        dispatch(storeAuthData(data));
    }
}

export function getCurrentPlayback(accessToken) {

    var config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }

    var endpoint = 'https://api.spotify.com/v1/me/player';



    return (dispatch) => {

        dispatch({
            type: PENDING_CURRENT_PLAYBACK
        });

        axios.get(endpoint, config)
        .then(
            (response) => {
                console.log(response);
                dispatch({
                    type: STORE_CURRENT_PLAYBACK,
                    playbackData: response.data || ""
                });
            },
            (errorMsg) => {
                dispatch({
                    type: REQUEST_FAILED,
                    error: errorMsg
                });
            }
        )


    }

}

export function storeAuthData(authData) {
    return (dispatch) => {
        axios.post("http://localhost:8000/api/auth/store", {authData: authData})
            .then(
                (response) => {
                    console.log(response);
                    dispatch({
                        type: AUTH_STORAGE,
                        success: true
                    });
                },
                () => {
                    dispatch({
                        type: AUTH_STORAGE,
                        success: false
                    });
                }
            )
    }
}


