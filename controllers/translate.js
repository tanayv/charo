/**
 * File: translate.js
 * Exports: Functions
 * Description: Contains functions that interact with the Yandex API and perform DOM optimization
*/

const axios = require("axios");
const yandexApiKey = process.env.YANDEX_API_KEY || require("./../secrets.json").YANDEX_API_KEY;
var querystring = require("querystring");
const translationKey = process.env.TRANSLATION_KEY || require("./../secrets.json").TRANSLATION_KEY;

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

    songLines.forEach((line) => {
        if (line != '') {
            var requestBody = {
                text: removeHTMLTags(line),
                lang: translationKey
            };
    
            var request = axios.post(endpoint, querystring.stringify(requestBody), config);
            promiseChain.push(request);
        }
        else {
            console.log("Skipped line break");
        }

    })

    var combinedChain = [];
    Promise.all(promiseChain)
        .then((response) => {

            var translationIndex = 0;
            songLines.forEach((songLine) => {
                if (songLine != '') {
                    /* console.log(response[translationIndex]); */
                    combinedChain.push({
                        original: removeHTMLTags(songLine),
                        translation: response[translationIndex].data.text[0]
                    });
                    translationIndex++;
                }
                else {
                    combinedChain.push({
                        original: '',
                        translation: ''
                    });
                }
            })
            callback(combinedChain);
        },
        (error) => {
            console.log("There was an error in translation", error);
            callback([]);
        })

}

/**
 * Performs elementary optimizations to prepare payload for translation by 
 * extracting parts inside a <p> tag. 
 * @param {string} domContent: HTML DOM body for genius embed
 */
const optimizeDomForTranslation = (domContent) => {

    var extractedData = "";

    while (domContent.indexOf("<p>") != -1) {

        var clipStart = domContent.indexOf("<p>") + 3;
        var clipEnd = domContent.indexOf("</p>");
        var clippedData = "";
        for (var i = clipStart; i < clipEnd; i++) {
            clippedData += domContent[i];
        };
        
        /* Remove clipped content from domContent */
        domContent = domContent.substr(clipEnd, domContent.length);

        extractedData += clippedData;
        
    }

    return extractedData;

}

/**
 * Extracts innertext from <div> tag strings
 * @param {string} line A <div> tag including inner HTML
 */
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


const translateSongLyricsFake = (songLyrics, callback) => {

    var reqText = optimizeDomForTranslation(songLyrics);
    var songLines = reqText.split("<br>");

    var songLineChain = [];
    songLines.forEach((line) => {
        if (removeHTMLTags(line) == "") {
            songLineChain.push({
                original: "",
                translation: ""
            })
        }

        else {
            songLineChain.push({
                original: removeHTMLTags(line),
                translation: "t" + removeHTMLTags(line)
            })
        }
    })
        
    callback(songLineChain);
}

/*

    Archived Legacy Code for reference


    Working single request before promise chain
        
    <code>
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
    </code>

*/

module.exports = {
    translateSongLyrics,
    translateSongLyricsFake
}