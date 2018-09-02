/**
 * File: index.js
 * Exports: Express Router
 * Description: Router for API that connects different controllers and routers within the API
 */

var express = require("express");
var router = express.Router();
var axios = require("axios");
var genius_api = require("genius-api");
const Lyricist = require('lyricist/node6');
var geniusAccessToken = "<GENIUS_API_ACCESS_TOKEN>";
var lyricist = new Lyricist(geniusAccessToken);



var spotify = require("./../controllers/spotify");
//var genius = require("./../controllers/genius");

var genius = new genius_api(geniusAccessToken);
var translator = require("google-translate-api");



var authData = {};

router.get("/playback", (req, res) => {
    var endpoint = 'https://api.spotify.com/v1/me/player';
    var config = {
        headers: {
            'Authorization': 'Bearer ' + authData.access_token
        }
    }
    axios.get(endpoint, config)
        .then(
            (response) => {
                var songName = response.data.item.name;
                var spotifyData = response.data;
                res.json({
                    "spotify": spotifyData
                });
                /*
                genius.search(songName).then(function(response) {

                    songId = response.hits[0].result.id;
                    lyricist.song(songId, { fetchLyrics: true }).then(
                        (lyrics) => {


                            var abc = lyrics;

                            translator(abc, {to: 'en'}).then(glot => {
                                console.log("glot", glot);
                                res.json({
                                    "spotify": spotifyData,
                                    "genius": response,
                                    "geniusSongId": songId,
                                    "lyrics": lyrics,
                                    "translation": glot.text
                                });
                            }).catch(err => {
                                console.error(err);
                            });


                        }
                    )

                    
                });*/
                
            },
            (error) => {
                console.log(error);
                res.json(error);
            }
        )
});


router.post("/auth/store", (req, res) => {
    
    if (req.body.authData) {
        authData = req.body.authData;
        res.json({
            received: authData,
            success: true
        });
    }
    else {
        res.json({
            received: authData,
            success: false
        });
    }
})




module.exports = router;