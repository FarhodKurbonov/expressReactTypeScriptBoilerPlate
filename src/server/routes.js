"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
var express = require("express");
var shared_1 = require("../shared");
var router = express.Router();
router.get('/api/hello', function (req, res, next) {
    res.json('World');
});
router.use('/channel/create/:channelID/:name/:participants', function (_a, res) {
    var _b = _a.params, channelID = _b.channelID, name = _b.name, participants = _b.participants;
    var channel = {
        id: channelID,
        name: name,
        participants: JSON.parse(participants),
        messages: []
    };
    shared_1.channels.push(channel);
    res.status(300).json(channel);
});
router.use('/channel/:id', function (req, res) {
    res.json(shared_1.channels.find(function (channel) { return channel.id === req.params.id; }));
});
router.use('/user/activeChannel/:userID/:channelID', function (_a, res) {
    var _b = _a.params, userID = _b.userID, channelID = _b.channelID;
    shared_1.users.find(function (user) { return user.id === userID; }).activeChannel = channelID;
    res.status(200).send(true);
});
router.use('/user/:id', function (req, res) {
    res.json(shared_1.users
        .map(function (_a) {
        var name = _a.name, id = _a.id;
        return ({ name: name, id: id });
    })
        .find(function (user) { return user.id === req.params.id; }));
});
router.use('/status/:id/:status', function (_a, res) {
    var _b = _a.params, id = _b.id, status = _b.status;
    if (!["ONLINE", "OFFLINE", "AWAY"].includes(status)) {
        return res.status(403).send();
    }
    var user = shared_1.users
        .find(function (user) { return user.id === id; });
    if (user) {
        user.status = status;
        res.status(200).send();
    }
    else {
        res.status(404).send();
    }
});
var createMessage = function (_a) {
    var userID = _a.userID, channelID = _a.channelID, messageID = _a.messageID, input = _a.input;
    var channel = shared_1.channels.find(function (channel) { return channel.id === channelID; });
    var message = {
        id: messageID,
        content: {
            text: input
        },
        owner: userID
    };
    channel.messages.push(message);
};
exports.createMessage = createMessage;
router.use('/input/submit/:userID/:channelID/:messageID/:input', function (_a, res) {
    var _b = _a.params, userID = _b.userID, channelID = _b.channelID, messageID = _b.messageID, input = _b.input;
    var user = shared_1.users.find(function (user) { return user.id === userID; });
    if (!user) {
        return res.status(404).send();
    }
    (0, exports.createMessage)({ userID: userID, channelID: channelID, messageID: messageID, input: input });
    res.status(300).send();
});
exports.default = router;
