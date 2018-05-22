"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Job = (function () {
    function Job() {
        this.id = "Hello";
    }
    Job.prototype.getId = function () {
        return this.id;
    };
    Job.prototype.setId = function (id) {
        this.id = id;
        return this;
    };
    Job.prototype.getTask = function () {
        return this.task;
    };
    Job.prototype.setTask = function (task) {
        this.task = task;
        return this;
    };
    Job.prototype.getLastRun = function () {
        return this.lastRun;
    };
    Job.prototype.setLastRun = function (lastRun) {
        this.lastRun = lastRun;
        return this;
    };
    Job.prototype.getIntervalInMinutes = function () {
        return this.interval;
    };
    Job.prototype.setIntervalInMinutes = function (interval) {
        this.interval = interval;
        return this;
    };
    Job.prototype.getRecurrences = function () {
        return this.recurrences;
    };
    Job.prototype.setRecurrences = function (recurrences) {
        this.recurrences = recurrences;
        return this;
    };
    Job.prototype.getRunCount = function () {
        return this.runCount;
    };
    Job.prototype.setRunCount = function (count) {
        this.runCount = count;
        return this;
    };
    return Job;
}());
exports.default = Job;
//# sourceMappingURL=Job.js.map