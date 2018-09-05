const geniusModule = require("genius-api");
const axios = require("axios");
var geniusAccessToken = process.env.geniusAccessToken || require("./../secrets.json").geniusAccessToken;
var genius = new geniusModule(geniusAccessToken);


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

module.exports = {
    findSongId,
    embedSongLyrics
}