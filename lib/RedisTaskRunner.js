"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis = require("redis");
var Job_1 = require("./Job");
var RedisConfig_1 = require("./RedisConfig");
var RedisTaskRunner = (function () {
    function RedisTaskRunner(env) {
        this.config = new RedisConfig_1.default(env.dbHost, env.dbPort, env.dbName, env.dbPass);
        this.channel = env.channel;
        try {
            this.connect(this.config);
        }
        catch (error) {
            throw new Error("Could not connect to database");
        }
    }
    RedisTaskRunner.prototype.run = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getPendingJobs()
                .then(function (pendingJobs) {
                console.log({ pendingJobs: pendingJobs });
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    RedisTaskRunner.prototype.connect = function (config) {
        var options = {
            host: config.host,
            port: config.port,
            retry_strategy: function (status) {
                if (status.error && status.error.code === "ECONNREFUSED") {
                    return new Error("The server refused the connection");
                }
                if (status.total_retry_time > 1000 * 60 * 60) {
                    return new Error("Retry time exhausted");
                }
                if (status.attempt > 10) {
                    return undefined;
                }
                return Math.min(status.attempt * 100, 3000);
            },
        };
        if (config.db) {
            options.db = config.db;
        }
        if (config.password) {
            options.password = config.password;
        }
        this.client = redis.createClient(options);
        return this;
    };
    RedisTaskRunner.prototype.disconnect = function () {
        this.client.end();
        return this;
    };
    RedisTaskRunner.prototype.getPendingJobs = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var min = 0;
            var max = Math.floor(Date.now() / 1000);
            var key = [_this.channel, "scheduler", "active"].join(":");
            _this.client.zrangebyscore(key, min, max, function (err, jobs) {
                if (err !== null) {
                    throw new Error("Error fetching jobs from database");
                }
                var pendingJobs = [];
                jobs.map(function (jobStr) {
                    try {
                        var jobDict = JSON.parse(jobStr);
                        pendingJobs.push(new Job_1.default().fromDict(jobDict));
                    }
                    catch (error) {
                        reject(new Error("Error parsing JSON"));
                    }
                });
                resolve(pendingJobs);
            });
        });
    };
    RedisTaskRunner.prototype.handleJob = function (job) {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    RedisTaskRunner.prototype.saveJob = function (job) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var jobDict = job.toDict();
            var key = [_this.channel, "job"].join(":");
            try {
                var jobStr = JSON.stringify(jobDict);
                _this.client.set(key, jobStr, function (err, reply) {
                    if (err !== null) {
                        throw new Error("Error saving job " + key);
                    }
                });
            }
            catch (error) {
                reject(new Error("Error converting obj to JSON string"));
            }
        });
    };
    RedisTaskRunner.prototype.removeJob = function (key) {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    RedisTaskRunner.prototype.handleTask = function (task) {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    return RedisTaskRunner;
}());
exports.default = RedisTaskRunner;
//# sourceMappingURL=RedisTaskRunner.js.map