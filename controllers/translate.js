const axios = require("axios");
const yandexApiKey = require("./../secrets.json").yandex;
var querystring = require("querystring");

const translateSongLyrics = (songLyrics, callback) => {
    
    var reqText = optimizeDomForTranslation(songLyrics);
    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    var endpoint = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + yandexApiKey;
    
    var songLines = reqText.split("<br>");
    var promiseChain = [];

    for (var line of songLines) {
        
        if (line != '') {
            var requestBody = {
                text: removeHTMLTags(line),
                lang: 'fr-en'
            };
    
            var request = axios.post(endpoint, querystring.stringify(requestBody), config);
            promiseChain.push(request);
        }
        else {
            console.log("Skipped line break");
        }
    }

     
    var combinedChain = [];
    Promise.all(promiseChain)
        .then((response) => {

            var translationIndex = 0;
            for (var i = 0; i < songLines.length; i++) {
                if (line != '') {
                    combinedChain[i].push({
                        original: removeHTMLTags(songLines[i]),
                        translation: response[translationIndex].data.text[0]
                    });
                    translationIndex++;
                }
                else {
                    combinedChain[i].push({
                        original: '',
                        translation: ''
                    });
                }
            }

            callback(combinedChain);
        },
        (error) => {
            console.log("There was an error in translation", error);
            callback([]);
        })
    

    /* To preserve API Calls
    var songLineChain = [];
    for (var line of songLines) {
        songLineChain.push({
            original: removeHTMLTags(line),
            translation: "t" + removeHTMLTags(line)
        })
    }

    callback(songLineChain);
    */


    

}

const optimizeDomForTranslation = (domContent) => {
    var clipStart = domContent.indexOf("<p>") + 3;
    var clipEnd = domContent.indexOf("</p>");
    var clippedData = "";
    for (var i = clipStart; i < clipEnd; i++) {
        clippedData += domContent[i];
    };

    return clippedData;
}

const removeHTMLTags = (line) => {
    
    var tagFlag = false;
    var sanitizedLine = "";
    for (var i = 0; i < line.length; i++) {
        if (line[i] == "<")
            tagFlag = true;
        if (!tagFlag)
            sanitizedLine += line[i];
        if (line[i] == ">")
            tagFlag = false;
    }
    return sanitizedLine;
}


/*
    Working single request before promise chain
    var requestBody = {
        text: removeHTMLTags(songLines[2]),
        lang: 'fr-en'
    };

    
    axios.post(endpoint, querystring.stringify(requestBody))
        .then((response) => {
            console.log(response.data);
            callback([
                {
                    original: songLines[2],
                    translation: response.data.text
                }
            ]);
        }, 
        (error) => {
            console.log(error);
            callback([]);
        });
    */

module.exports = {
    translateSongLyrics
}