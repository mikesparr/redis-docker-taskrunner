"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RedisConfig_1 = require("./RedisConfig");
var RedisTaskRunner = (function () {
    function RedisTaskRunner(env) {
        this.config = new RedisConfig_1.default(env.dbHost, env.dbPort, env.dbName, env.dbPass);
    }
    RedisTaskRunner.prototype.run = function () {
        console.log("Hello, world");
    };
    return RedisTaskRunner;
}());
exports.default = RedisTaskRunner;
//# sourceMappingURL=RedisTaskRunner.js.map