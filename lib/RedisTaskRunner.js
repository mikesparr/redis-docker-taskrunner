"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RedisConfig_1 = require("./RedisConfig");
var RedisTaskRunner = (function () {
    function RedisTaskRunner(env) {
        this.config = new RedisConfig_1.default(env.dbHost, env.dbPort, env.dbName, env.dbPass);
        this.channel = env.channel;
    }
    RedisTaskRunner.prototype.run = function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("Hello, world");
                resolve(true);
            }, 2500);
        });
    };
    return RedisTaskRunner;
}());
exports.default = RedisTaskRunner;
//# sourceMappingURL=RedisTaskRunner.js.map