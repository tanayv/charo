var spotifyAPI = require("spotify-web-api-node");

/* Environment Variables */
const CLIENT_ID = process.env.clientId || require("./../env.json").clientId;
const CLIENT_SECRET = process.env.clientSecret || require("./../env.json").clientSecret

var spotify = new spotifyAPI({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: 'https://charognard.herokuapp.com/callback'
})

var token = "";
var expires = 0;

var getPlayback = (callback) => {
    spotify.getMyCurrentPlaybackState({})
    .then(function(data) {
        callback(data.body)
    }, function(err) {
        callback({})
        console.log("There was an error " + err);
    });
}

var parseCallback = (req) => {
    console.log(req.query);
}

module.exports = {
    getPlayback,
    parseCallback
}