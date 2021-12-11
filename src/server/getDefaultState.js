"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultState = void 0;
var immutable_1 = require("immutable");
var shared_1 = require("../shared");
var db_1 = require("./db");
var getDefaultState = function (currentUser) {
    var defaultState = {
        currentUser: {},
        channels: [],
        userInfo: [],
    };
    var userChannels = shared_1.channels.filter(function (channel) { return channel.participants.includes(currentUser.id); });
    var activeChannel = db_1.Channel.getChannel(currentUser.activeChannel);
    defaultState.currentUser = currentUser;
    defaultState.channels = userChannels.map(function (channel) {
        if (channel.id === activeChannel.id) {
            return __assign(__assign({}, channel), { fetchStatus: "FETCHED" });
        }
        else {
            return {
                id: channel.id,
                name: channel.name,
                messages: [],
                fetchStatus: "NOT_FETCHED",
                participants: channel.participants
            };
        }
    });
    defaultState.userInfo = __spreadArray(__spreadArray([currentUser], activeChannel.participants.map(db_1.User.getUser), true), currentUser.contacts.map(db_1.User.getUser), true).map(function (user) { return ({
        name: user.name,
        fetchStatus: "FETCHED",
        id: user.id,
        status: user.status
    }); });
    return (0, immutable_1.fromJS)(defaultState);
};
exports.getDefaultState = getDefaultState;
