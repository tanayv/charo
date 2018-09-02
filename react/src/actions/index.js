
import axios from 'axios';

export const SET_REQUEST_URL = 'SET_REQUEST_URL';
export const PARSE_RESPONSE_URL = 'PARSE_RESPONSE_URL';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const STORE_AUTH_DATA = 'STORE_AUTH_DATA';
export const AUTHENTICATED = 'AUTHENTICATED';
export const GET_PLAYBACK_PAYLOAD = 'GET_PLAYBACK_PAYLOAD';


/**
 * Defines request parameters sent to the Spotify Authorization API by  setting the URL which is called once the authentication button is clicked
 * 
 */
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
    return {
        type: SET_REQUEST_URL,
        requestUrl: requestUrl
    }

}

/**
 * This action is used after the Spotify API redirects back to this application. It parses the return hash fragment and communicates all the parsed data to the backend
*/
export function parseResponseUrl() {
    
    var url = window.location.href;

    var queryStart = url.indexOf("#") + 1,
        queryEnd   = url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        data = {}, i, n, v, nv;

    if (query === url || query === "") 
    return {
        type: PARSE_RESPONSE_URL,
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

/**
 * Makes a POST request to the backend /api/auth/store to store the response parsed from the hash fragments and send it to the backend
 * @param {Object} authData
 */
export function storeAuthData(authData) {
    return (dispatch) => {
        axios.post("http://localhost:8000/api/auth/store", {authData: authData})
            .then(
                (response) => {
                    dispatch({
                        type: STORE_AUTH_DATA,
                        success: true
                    });
                },
                () => {
                    dispatch({
                        type: STORE_AUTH_DATA,
                        success: false
                    });
                }
            )
    }
}

/**
 * Makes a GET request to the playback endpoint and receive all payloads from the backend
 */
export const getPaybackPayload = () => {
    console.log("Fetching playback data from backend");
    return (dispatch) => {
        axios.get("http://localhost:8000/api/playback")
            .then(
                (response) => {
                    dispatch({
                        type: GET_PLAYBACK_PAYLOAD,
                        data: response.data
                    });
                },
                () => {
                    dispatch({
                        type: GET_PLAYBACK_PAYLOAD,
                        data: {}
                    });
                }
            )
    }
}


