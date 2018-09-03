const axios = require("axios");

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