/**
 * File: index.js
 * Exports: Express Router
 * Description: Router for API that connects different controllers and routers within the API
 */

var express = require("express");
var router = express.Router();

var spotify = require("./../controllers/spotify");
var genius = require("./../controllers/genius");
var translator = require("./../controllers/translate");

var authData = {};

router.get("/playback", (req, res) => {

    /* Level 1: Get playback data from the Spotify API */
    spotify.fetchPlayback(authData.access_token, (spotifyData) => {

        if (spotifyData) {
            
            var songName = spotifyData.item.name;
            var artistName = spotifyData.item.artists[0].name;
            var songQuery = songName;

            /* Level 2: Find the song's ID using the Genius API Search */
            genius.findSongId(songQuery, (geniusData) => {
                if (geniusData && geniusData.hits.length > 0) {
                    var songId = geniusData.hits[0].result.id;

                    /* @todo: Verify if song name, artist name corresponds with hit to prevent wrong lyrics being displayed. */

                    /* Level 3: Fetch the song lyrics using the song ID */
                    genius.getSongLyrics(songId, (lyricistData) => {
                        if (lyricistData) {
                            var lyrics = lyricistData.lyrics;

                            /* Level 4: Translate song lyrics line-by-line */
                            translator.translateSongLyrics(lyrics, (translation) => {

                                /* Complete full task at Level 4 */
                                if (translation) {
                                    res.json({
                                        "spotify": spotifyData,
                                        "genius": geniusData,
                                        "lyricist": lyricistData,
                                        "lyrics": lyrics,
                                        "translation": translation
                                    });

                                }

                                /* Abandon at Level 4 */
                                else {
                                    res.json({
                                        "spotify": spotifyData,
                                        "genius": geniusData,
                                        "lyricist": lyricistData,
                                        "lyrics": lyrics,
                                        "translation": []
                                    });
                                }
                            })
                        }
                        else {
                            /* Abandon at Level 3 */
                            res.json({
                                "spotify": spotifyData,
                                "genius": geniusData,
                                "lyricist": {},
                                "lyrics": {},
                                "translation": []
                            });
                        }
                    })
                }
                else {
                    /* Abandon at Level 2 */
                    res.json({
                        "spotify": spotifyData,
                        "genius": {},
                        "lyricist": {},
                        "lyrics": {},
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
                "lyricist": {},
                "lyrics": {},
                "translation": []
            });

        }
    })

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