
export const SET_REQUEST_URL = 'SET_REQUEST_URL';


/** Basically the capitalized actions defined as functions with an optional extra return value */

export function setRequestUrl(redirectUrl) {
    var loginConfig = {
        "baseUrl": "https://accounts.spotify.com/authorize",
        "urlParams": {
            "client_id": "804e43256299432b8e9401998ec9e22b",
            "redirect_uri": window.location.href,
            "scopes": [
                "user-read-currently-playing",
                "user-read-playback-state"
            ],
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


