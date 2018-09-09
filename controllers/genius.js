/**
 * File: genius.js
 * Exports: Functions
 * Description: Contains functions that interact with the Genius API and work on dynamically * embedding Genius content
*/

const geniusModule = require("genius-api");
const axios = require("axios");
var geniusAccessToken = process.env.GENIUS_API_KEY || require("./../secrets.json").geniusAccessToken;
var genius = new geniusModule(geniusAccessToken);

/**
 * Fetches the song's information on Genius using the Genius API search endpoint
 * @param {string} songName Name of the song (received from Spotify playback)
 * @param {funciton} callback Callback function that sends response from Genius API
 */
const findSong = (songName, callback) => {
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

/**
 * Fetches information needed to dynamically embed Genius song lyrics in React
 * @param {string} songId Genius API ID for the song
 * @param {function} callback Callback returning embedding data
 */
const embedSongLyrics = (songId, callback) => {
    axios.get("https://genius.com/songs/" + songId + "/embed.js")
        .then((response) => {

            var body = response.data; 

            var clipStart = body.indexOf("document.write(JSON.parse('") + 29;
            var clipEnd = body.indexOf("<iframe src=");

            var clippedData = "";

            for (var i = clipStart; i < clipEnd; i++) {
                clippedData += body[i];
            }

            var counter = 0;
            var filteredData = "";
            for (var i = 0; i < clippedData.length; i++) {
                if (clippedData[i] == "\\" && clippedData[i+1] == "n") {
                    i++;
                    counter++;
                }
                else if (clippedData[i] == "\\") {
                    counter++;
                }
                else {
                    filteredData += clippedData[i];
                }
            }

            console.log(counter + " dirty characters replaced");
            console.log("Total characters:" + filteredData.length);

            callback(filteredData);
        }, 
        (err) => {
            console.log(err);
            callback([]);
        })
}

/**
 * Verifies whether the lyrics being sent belong to the correct song and artist
 * received from Spotify playback
 * @param {array} ageniusData Array of Genius "Hits"
 * @param {string} songName Name of song (from Spotify playback)
 * @param {string} artistName Name of song artist (from Spotify playback)
 */
const verify = (geniusData, songName, artistName) => {
    var resIndex = -1;
    
    geniusData.hits.forEach((hit, index) => {
        var hitName = hit.result.title;
        var hitArtist = hit.result.primary_artist.name;

        if (songName.toLowerCase() === hitName.toLowerCase()) {
            if (hitArtist.toLowerCase() === artistName.toLowerCase()) {
                resIndex = index;
            }
        }
    })

    return resIndex;
}

module.exports = {
    findSong,
    embedSongLyrics,
    verify
}