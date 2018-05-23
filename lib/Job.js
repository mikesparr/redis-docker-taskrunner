"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ITask_1 = require("./ITask");
var Run_1 = require("./Run");
var Task_1 = require("./Task");
var Job = (function () {
    function Job(id, task, lastRun, intervalInMinutes, recurrences, runCount) {
        this.id = id;
        this.task = task;
        this.lastRun = lastRun;
        this.interval = intervalInMinutes;
        this.recurrences = recurrences;
        this.runCount = runCount;
        return this;
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
    Job.prototype.fromDict = function (obj) {
        var newRun = new Run_1.default(obj.lastRun.id, obj.lastRun.timestamp, obj.lastRun.success);
        var newTask = new Task_1.default(ITask_1.TaskType.PubSub, obj.task.target, obj.task.context);
        this.id = obj.id;
        this.task = newTask;
        this.lastRun = newRun;
        this.interval = obj.intervalInMinutes;
        this.recurrences = obj.recurrences;
        this.runCount = obj.runCount;
        return this;
    };
    Job.prototype.toDict = function () {
        var obj = {
            id: this.id,
            intervalInMinutes: this.interval,
            lastRun: {
                id: this.lastRun.getId(),
                success: this.lastRun.getSuccess(),
                timestamp: this.lastRun.getTimestamp(),
            },
            recurrences: this.recurrences,
            runCount: this.runCount,
            task: {
                context: this.task.getContext(),
                target: this.task.getTarget(),
                type: this.task.getType(),
            },
        };
        return obj;
    };
    return Job;
}());
exports.default = Job;
//# sourceMappingURL=Job.js.map