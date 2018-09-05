const axios = require("axios");
const yandexApiKey = require("./../secrets.json").yandex;

const translateSongLyrics = (songLyrics, callback) => {
    
    
    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var endpoint = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + yandexApiKey;


    const requestBody = {
        text: 'C\'est bien',
        lang: 'fr-en'
    };

    /*
    axios.post(endpoint, requestBody, config)
        .then(
            (response) => {

            },
            (error) => {

            }
    )*/

    callback([]);


}


module.exports = {
    translateSongLyrics
}