"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis = require("redis");
var Job_1 = require("./Job");
var RedisConfig_1 = require("./RedisConfig");
var Run_1 = require("./Run");
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
                var runReport = new RunReport_1.default("run-" + Date.now(), null, 0, Date.now(), true);
                if (pendingJobs.length === 0) {
                    resolve(runReport);
                }
                else {
                    var jobs_1 = [];
                    pendingJobs.map(function (pendingJob) {
                        jobs_1.push(_this.handleJob(pendingJob));
                    });
                    Promise.all(jobs_1)
                        .then(function (values) {
                        runReport.setTaskCount(values.length);
                        _this.disconnect();
                        resolve(runReport);
                    })
                        .catch(function (error) {
                        _this.disconnect();
                        reject(error);
                    });
                }
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
        this.client.end(false);
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
        var _this = this;
        return new Promise(function (resolve, reject) {
            var task = job.getTask();
            _this.client[task.getType()](task.getTarget(), JSON.stringify(task.getContext()), function (targetErr, reply) {
                if (targetErr !== null) {
                    throw targetErr;
                }
                job.setRunCount(job.getRunCount() + 1);
                job.setLastRun(new Run_1.default("run-" + Date.now(), Date.now(), true));
                var repeats = job.getRecurrences();
                var lastRun = repeats > 0 && repeats === job.getRunCount() ? true : false;
                if (lastRun) {
                    _this.client.multi()
                        .zrem(_this.getJobsKey("active"), _this.getJobKey(job))
                        .zadd(_this.getJobsKey("completed"), _this.generateJobScore(), _this.getJobKey(job))
                        .exec(function (err, replies) {
                        if (err !== null) {
                            reject(err);
                        }
                        resolve();
                    });
                }
                else {
                    _this.client.multi()
                        .set(_this.getJobKey(job), JSON.stringify(job.toDict()))
                        .zincrby(_this.getJobsKey("active"), job.getIntervalInMinutes() * 60000, _this.getJobKey(job))
                        .exec(function (err, replies) {
                        if (err !== null) {
                            reject(err);
                        }
                        resolve();
                    });
                }
            });
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
            try {
                var jobStr = JSON.stringify(jobDict);
                var jobKey_1 = _this.getJobKey(job);
                _this.client.set(jobKey_1, jobStr, function (err, reply) {
                    if (err !== null) {
                        throw new Error("Error saving job " + jobKey_1);
                    }
                });
            }
            catch (error) {
                reject(new Error("Error converting obj to JSON string"));
            }
        });
    };
    RedisTaskRunner.prototype.removeJob = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.client.del(key, function (err, reply) {
                    if (err !== null) {
                        throw new Error("Error removing job " + key);
                    }
                    resolve();
                });
            }
            catch (error) {
                reject(new Error("Error converting obj to JSON string"));
            }
        });
    };
    RedisTaskRunner.prototype.generateJobScore = function () {
        return Math.floor(Date.now() / 1000);
    };
    RedisTaskRunner.prototype.getJobsKey = function (status) {
        return [this.channel, "jobs", status].join(":");
    };
    RedisTaskRunner.prototype.getJobKey = function (job) {
        return [this.channel, "job", job.getId()].join(":");
    };
    return RedisTaskRunner;
}());
exports.default = RedisTaskRunner;
//# sourceMappingURL=RedisTaskRunner.js.map