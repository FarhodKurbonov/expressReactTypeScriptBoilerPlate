"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var vars_1 = require("../../shared/vars");
var User = /** @class */ (function () {
    function User() {
    }
    User.getUser = function (id) {
        var user = vars_1.users.find(function (user) { return user.id === id; });
        if (!user) {
            throw new Error("Could not find user with ID ".concat(id));
        }
        return user;
    };
    return User;
}());
exports.User = User;
