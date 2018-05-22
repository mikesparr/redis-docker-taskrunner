"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Run = (function () {
    function Run(id, timestamp, success) {
        this.id = id;
        this.timestamp = timestamp;
        this.success = success;
    }
    Run.prototype.getId = function () {
        return this.id;
    };
    Run.prototype.setId = function (id) {
        this.id = id;
        return this;
    };
    Run.prototype.getTimestamp = function () {
        return this.timestamp;
    };
    Run.prototype.setTimestamp = function (timestamp) {
        this.timestamp = timestamp;
        return this;
    };
    Run.prototype.getSuccess = function () {
        return this.success;
    };
    Run.prototype.setSuccess = function (success) {
        this.success = success;
        return this;
    };
    return Run;
}());
exports.default = Run;
//# sourceMappingURL=Run.js.map