const geniusModule = require("genius-api");
var geniusAccessToken = process.env.geniusAccessToken || require("./../secrets.json").geniusAccessToken;
var genius = new geniusModule(geniusAccessToken);
const lyricistModule = require('lyricist/node6');
var lyricist = new lyricistModule(geniusAccessToken);

const findSongId = (songName, callback) => {
    genius.search(songName)
        .then(
            (response) => {
                callback(response)
            },
            (error) => {
                console.log("Error with Genius API song ID retrieval", error)
                callback({})
            }
        )
}

const getSongLyrics = (songId, callback) => {
    lyricist.song(songId, { fetchLyrics: true }).then(
        (lyricistData) => {
            callback(lyricistData);
        },
        (error) => {
            console.log("Error with Lyricist lyrics retrieval", error);
            callback({});
        }
    )
}

module.exports = {
    findSongId,
    getSongLyrics
}