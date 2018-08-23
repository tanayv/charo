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
    spotify.getPlayback((data) => {
        res.json(data);
    })
});

router.get("/callback/*:data", (req, res) => {
    console.log("HELLO");
    console.log(req.params.data);
    res.json({"hi": "Hello"});
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

router.get("/auth", (req, res) => {
    res.json(authData);
})





module.exports = router;