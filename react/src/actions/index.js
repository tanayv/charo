
import axios from 'axios';

export const GET_SPOTIFY_KEY = 'GET_SPOTIFY_KEY';
export const SET_REQUEST_URL = 'SET_REQUEST_URL';
export const PARSE_RESPONSE_URL = 'PARSE_RESPONSE_URL';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const STORE_AUTH_DATA = 'STORE_AUTH_DATA';
export const AUTHENTICATED = 'AUTHENTICATED';
export const GET_PLAYBACK_PAYLOAD = 'GET_PLAYBACK_PAYLOAD';
export const SET_VIEW = 'SET_VIEW';

/**
 * Creates action to obtain Spotify key from the backend
 */
export const getSpotifyKey = () => {
    return (dispatch) => {

        let href = window.location.href;
        let hrefArr = href.split("/");
        let url = hrefArr[0] + "//" + hrefArr[2];

        console.log(url + "/api/spotify/key");
        axios.get(url + "/api/spotify/key")
            .then(
                (response) => {
                        console.log(response);
                        dispatch(setRequestUrl(response.data.key));
                },
                () => {
                    dispatch({
                        type: GET_SPOTIFY_KEY,
                        data: {}
                    });
                }
            )
    }

}

/**
 * Defines request parameters sent to the Spotify Authorization API by
 * setting the URL which is called once the authentication button is clicked
 * @param {string} spotifyKey 
 */
export const setRequestUrl = (spotifyKey) => {

    let href = window.location.href;
    let hrefArr = href.split("/");
    let url = hrefArr[0] + "//" + hrefArr[2];

    var loginConfig = {
        "baseUrl": "https://accounts.spotify.com/authorize",
        "urlParams": {
            "client_id": spotifyKey,
            "redirect_uri": url + "/auth/callback/",
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
export const parseResponseUrl = () => {
    
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
    
    
    return (dispatch) => {
        dispatch(storeAuthData(data));
    }
}

/**
 * Makes a POST request to the backend /api/auth/store to store the response parsed from the hash fragments and send it to the backend
 * @param {Object} authData
 */
export const storeAuthData = (authData) => {
    return (dispatch) => {

        let href = window.location.href;
        let hrefArr = href.split("/");
        let url = hrefArr[0] + "//" + hrefArr[2];

        axios.post(url + "/api/auth/store", {authData: authData})
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
    return (dispatch) => {

        let href = window.location.href;
        let hrefArr = href.split("/");
        let url = hrefArr[0] + "//" + hrefArr[2];

        axios.get(url + "/api/playback")
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

/**
 * 
 * @param {number} view 
 */
export const setView = (view) => {
    return {
        type: SET_VIEW,
        newView: view
    }
}

