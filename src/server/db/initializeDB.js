"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDB = exports.getRandomMessage = exports.getRandomMessageText = void 0;
var lodash_1 = require("lodash");
var chance_1 = require("chance");
var shared_1 = require("../../shared");
var fetchStatus_1 = require("../../shared/types/enums/fetchStatus");
var chance = new chance_1.Chance();
var messageActions = ["collate", "port", "merge", "refactor", "check", "deploy", "automate", "debug", "erase", "cache", "rebase", "transpile", "desync", "fork"];
var messageObjects = ["repo", "source code", "code base", "sprint", "workflow", "debugger", "module", "version", "transpiler", "language", "integer", "router"];
var templates = [
    "I'm going to <%= action%> the <%= object%>.",
    "Could you <%= action%> the <%= object%>?",
    "I've noticed a <%= object%> that you could <%= action%>.",
    "Is there a <%= object%> I could <%= action%>?",
    "I'm thinking of attending a conference on <%= object%> management.",
    "Do you know how to <%= action%> the <%= object%>?",
    "The <%= object%> is amazing!",
    "Note to self: <%= action%> the <%= object%>.",
];
var getRandomMessageText = function () { return (0, lodash_1.template)(chance.pick(templates))({
    action: chance.pick(messageActions),
    object: chance.pick(messageObjects)
}); };
exports.getRandomMessageText = getRandomMessageText;
var getRandomMessage = function (userIDs) { return ({
    id: chance.guid(),
    owner: chance.pick(userIDs),
    content: {
        text: (0, exports.getRandomMessageText)()
    },
    date: chance.date({ year: 2017 })
}); };
exports.getRandomMessage = getRandomMessage;
var initializeDB = function () {
    var firstNames = ["Emily", "Chuck", "Andy", "Edgar", "Stephen", "Pablo", "Gustav", "Jackson", "Leonardo"];
    var lastNames = ["McCartney", "Webber", "Combs", "John", "Martin", "Starr", "Springstein", "Simmons", "Harrison"];
    var userCount = 12;
    while (userCount--) {
        shared_1.users.push({
            name: "".concat(chance.pick(firstNames), " ").concat(chance.pick(lastNames)),
            id: chance.guid(),
            contacts: [],
            channels: [],
            fetchStatus: fetchStatus_1.FetchStatus.FETCHED,
            status: chance.pick(["ONLINE", "OFFLINE", "AWAY"])
        });
    }
    var contactCount = 6;
    shared_1.users.forEach(function (user) {
        for (var i = 0; i < contactCount; i++) {
            var t = shared_1.users.filter(function (_a) {
                var id = _a.id;
                return id !== user.id && !user.contacts.includes(id);
            });
            user.contacts.push(chance.pick().id);
        }
    });
    var getMessages = function (userIDs, count) {
        if (count === void 0) { count = 12; }
        var messages = [];
        for (var i = count; i > 0; i--) {
            messages.push((0, exports.getRandomMessage)(userIDs));
        }
        return messages;
    };
    shared_1.users.forEach(function (user) {
        shared_1.channels.push({
            id: chance.guid(),
            name: "".concat(user.name, "'s Private Channel"),
            participants: [user.id],
            messages: getMessages([user.id])
        });
    });
    shared_1.users.forEach(function (user) {
        var user2 = chance.pick(shared_1.users.filter(function (_user) { return _user.id !== user.id; }));
        shared_1.channels.push({
            id: chance.guid(),
            name: "".concat(user.name, " and ").concat(user2.name, "'s Private Chat"),
            participants: [user.id, user2.id],
            messages: getMessages([user.id, user2.id])
        });
    });
    shared_1.channels.push({
        id: chance.guid(),
        name: "Group Chat",
        participants: shared_1.users.map(function (user) { return user.id; }),
        messages: getMessages(shared_1.users.map(function (user) { return user.id; }), 28)
    });
    shared_1.users.forEach(function (user) {
        user.activeChannel = chance.pick(shared_1.channels.filter(function (channel) { return channel.participants.includes(user.id); })).id;
    });
};
exports.initializeDB = initializeDB;
