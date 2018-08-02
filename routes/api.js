/**
 * File: index.js
 * Exports: Express Router
 * Description: Router for API that connects different controllers and routers within the API
 */

var express = require("express");
var router = express.Router();

var spotifyController = require("./../controllers/spotify");
var geniusController = require("./../controllers/genius");
var translateController = require("./../controllers/translate");

router.get("/playback", (req, res) => {

})

router.get("/callback", (req, res) => {
    
})

module.exports = router;