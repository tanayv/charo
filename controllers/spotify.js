var spotifyAPI = require("spotify-web-api-node");

/* Environment Variables */
const CLIENT_ID = process.env.clientId || require("./../env.json").clientId;
const CLIENT_SECRET = process.env.clientSecret || require("./../env.json").clientSecret

var spotify = new spotifyAPI({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: 'https://charognard.herokuapp.com/callback'
})
