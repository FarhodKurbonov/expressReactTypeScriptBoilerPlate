"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var routes_1 = require("./routes");
var app = express();
var initializeDB_1 = require("./db/initializeDB");
var shared_1 = require("../shared");
(0, initializeDB_1.initializeDB)();
var currentUser = shared_1.users[0];
app.use(express.static('public'));
app.use(routes_1.default);
app.use(function (req, res, next) {
    var delay = 297;
    setTimeout(next, delay);
});
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("Server listening on port: ".concat(port)); });
