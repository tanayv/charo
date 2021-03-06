/**
 * File: api.js
 * Exports: Express Router
 * Description: Router for API that connects different controllers and routers within the API
*/

var express = require("express");
var router = express.Router();

var spotify = require("./../controllers/spotify");
var genius = require("./../controllers/genius");
var translator = require("./../controllers/translate");

/** Temporary session-based storage for authentication data received from the Spotify API */
var authData = {};

/** 
 * Main endpoint that returns information on playback, lyrics and translation
 */
router.get("/playback", (req, res) => {

    /* Level 1: Get playback data from the Spotify API */
    spotify.fetchPlayback(authData.access_token, (spotifyData) => {

        if (spotifyData) {
            
            var songName = spotifyData.item.name;
            var artistName = spotifyData.item.artists[0].name;
            var songQuery = songName;

            /* Level 2: Find the song data on Genius using the Genius API Search */
            genius.findSong(songQuery, (geniusData) => {
                if (geniusData && geniusData.hits.length > 0) {
                    
                    var hitIndex = genius.verify(geniusData, songName, artistName); 
                    if (hitIndex != -1) {
                        var songId = geniusData.hits[hitIndex].result.id;

                        genius.embedSongLyrics(songId, (songLyrics) => {
                            if (songLyrics) {
                                
                                translator.translateSongLyrics(songLyrics, (translatedLyrics) => {
                                    if (translatedLyrics)
                                        res.json({
                                            "spotify": spotifyData,
                                            "genius": geniusData,
                                            "lyrics": songLyrics,
                                            "translation": translatedLyrics
                                        });
                                    else {
                                        res.json({
                                            "spotify": spotifyData,
                                            "genius": geniusData,
                                            "lyrics": songLyrics,
                                            "translation": []
                                        });
                                    }
                                })
    
                            }

                            else
                                /* Abandon at Level 2.5: Song (and) its lyrics not found */
                                res.json({
                                    "spotify": spotifyData,
                                    "genius": geniusData,
                                    "lyrics": "",
                                    "translation": []
                                })
                        })
                    }

                    else {
                        /* Abandon at Level 2 */
                        res.json({
                            "spotify": spotifyData,
                            "genius": {},
                            "lyrics": "",
                            "translation": []
                        });

                    }

                    
                }
                else {
                    /* Abandon at Level 2 */
                    res.json({
                        "spotify": spotifyData,
                        "genius": {},
                        "lyrics": "",
                        "translation": []
                    });
                }
            })

        }

        else {

            /* Abandon at Level 1 */
            res.json({
                "spotify": {},
                "genius": {},
                "lyrics": "",
                "translation": []
            });

        }
    })

});

/**
 * This endpoint is used to store data obtained from parsing the hash fragment
 * obtained from the Spotify API authentication response
 */
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


/**
 * Serve the API key on an API route for the frontend to be able to fetch
 */
router.get("/spotify/key", (req, res) => {
    res.json({
        "key": spotify.spotifyClientId
    });
})


module.exports = router;