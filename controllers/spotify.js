const axios = require("axios");

/**
 * Queries the Spotify playback API to receive information about user playback
 * @param {string} accessToken Access taken received from the Spotify API
 * @param {function} callback Callback function to return data received from Spotify
 */
const fetchPlayback = (accessToken, callback) => {
    const endpoint = 'https://api.spotify.com/v1/me/player';
    const config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    };

    axios.get(endpoint, config)
        .then(
            (response) => {
                var spotifyData = response.data;
                callback(spotifyData);
            },
            (error) => {
                console.log("Error with Spotify API Playback Retrieval", error);
                callback({});
            }
        )

}

module.exports = {
    fetchPlayback
}