"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
var shared_1 = require("../../shared");
var Channel = /** @class */ (function () {
    function Channel() {
    }
    Channel.getChannel = function (id) {
        var channel = shared_1.channels.find(function (channel) { return channel.id === id; });
        if (!channel) {
            throw new Error("Could not find channel with ID ".concat(id));
        }
        return channel;
    };
    return Channel;
}());
exports.Channel = Channel;
