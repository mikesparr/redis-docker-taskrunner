"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnvConfig = (function () {
    function EnvConfig() {
        this.schedulerName = process.env.SCHEDULER_NAME || "Default";
        this.channel = process.env.SCHEDULER_CHANNEL || "scheduler";
        this.dbHost = process.env.SCHEDULER_DB_HOST || "localhost";
        this.dbPort = +process.env.SCHEDULER_DB_PORT || 6379;
        this.dbName = +process.env.SCHEDULER_DB_NAME || 0;
        this.dbPass = process.env.SCHEDULER_DB_PASS || undefined;
    }
    EnvConfig.prototype.getSchedulerName = function () {
        return this.schedulerName;
    };
    EnvConfig.prototype.getChannel = function () {
        return this.channel;
    };
    EnvConfig.prototype.getDbHost = function () {
        return this.dbHost;
    };
    EnvConfig.prototype.getDbPort = function () {
        return this.dbPort;
    };
    EnvConfig.prototype.getDbName = function () {
        return this.dbName;
    };
    EnvConfig.prototype.getDbPass = function () {
        return this.dbPass;
    };
    return EnvConfig;
}());
exports.default = EnvConfig;
//# sourceMappingURL=EnvConfig.js.map