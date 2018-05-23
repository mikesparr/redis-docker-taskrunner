"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RunReport = (function () {
    function RunReport(id, jobId, taskCount, timestamp, success) {
        this.id = id;
        this.jobId = jobId;
        this.taskCount = taskCount;
        this.timestamp = timestamp;
        this.success = success;
    }
    RunReport.prototype.getId = function () {
        return this.id;
    };
    RunReport.prototype.setId = function (id) {
        this.id = id;
    };
    RunReport.prototype.getJobId = function () {
        return this.jobId;
    };
    RunReport.prototype.setJobId = function (jobId) {
        this.jobId = jobId;
    };
    RunReport.prototype.getTaskCount = function () {
        return this.taskCount;
    };
    RunReport.prototype.setTaskCount = function (taskCount) {
        this.taskCount = taskCount;
    };
    RunReport.prototype.getTimestamp = function () {
        return this.timestamp;
    };
    RunReport.prototype.setTimestamp = function (timestamp) {
        this.timestamp = timestamp;
    };
    RunReport.prototype.getSuccess = function () {
        return this.success || false;
    };
    RunReport.prototype.setSuccess = function (success) {
        this.success = success;
    };
    return RunReport;
}());
exports.default = RunReport;
//# sourceMappingURL=RunReport.js.map