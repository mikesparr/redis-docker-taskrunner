"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis = require("redis");
var Job_1 = require("./Job");
var RedisConfig_1 = require("./RedisConfig");
var RunReport_1 = require("./RunReport");
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
                var taskCount = pendingJobs.length || 0;
                var runReport = new RunReport_1.default("testRun1", "testJob1", taskCount, Date.now(), true);
                resolve(runReport);
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
            var key = [_this.channel, "jobs", "active"].join(":");
            _this.client.zrangebyscore(key, min, max, function (err, jobKeys) {
                if (err !== null) {
                    throw new Error("Error fetching jobs from database");
                }
                var fetchJobs = [];
                jobKeys.map(function (jobKey) {
                    fetchJobs.push(_this.getJob(jobKey));
                });
                Promise.all(fetchJobs)
                    .then(function (pendingJobs) {
                    resolve(pendingJobs);
                })
                    .catch(function (error) {
                    reject(error);
                });
            });
        });
    };
    RedisTaskRunner.prototype.handleJob = function (job) {
        return new Promise(function (resolve, reject) {
            resolve();
        });
    };
    RedisTaskRunner.prototype.getJob = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.get(key, function (err, jobJson) {
                if (err !== null) {
                    throw new Error("Error saving job " + key);
                }
                try {
                    var jobDict = JSON.parse(jobJson);
                    var job = new Job_1.default().fromDict(jobDict);
                    resolve(job);
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    };
    RedisTaskRunner.prototype.saveJob = function (job) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var jobDict = job.toDict();
            var key = [_this.channel, "job", job.getId()].join(":");
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