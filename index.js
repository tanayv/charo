/**
 * File: index.js
 * Exports: None
 * Description: Main script to run web application
 */

/* Package imports */
var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");

/* Express Initializations */
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8000;
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

/** Define API Route */
var apiRouter = require("./routes/api");
app.use("/api/", apiRouter);

/* Serve react frontend */
app.use(express.static(path.join(__dirname, "react", "build")));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, "react", "build", "index.html"));
});

/* Start the server */
app.listen(port, function() {
    console.log(`api running on port ${port}`);
});