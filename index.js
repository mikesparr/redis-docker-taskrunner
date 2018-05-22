"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnvConfig_1 = require("./lib/EnvConfig");
var RedisTaskRunner_1 = require("./lib/RedisTaskRunner");
var envConfig = new EnvConfig_1.default();
var runner = new RedisTaskRunner_1.default(envConfig);
console.log("Running ...");
runner.run();
console.log("Done");
//# sourceMappingURL=index.js.map