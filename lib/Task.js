"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = (function () {
    function Task(type, target, context) {
        this.type = type;
        this.target = target;
        this.context = context;
    }
    Task.prototype.getType = function () {
        return this.type;
    };
    Task.prototype.setType = function (type) {
        this.type = type;
        return this;
    };
    Task.prototype.getTarget = function () {
        return this.target;
    };
    Task.prototype.setTarget = function (target) {
        this.target = target;
        return this;
    };
    Task.prototype.getContext = function () {
        return this.context;
    };
    Task.prototype.setContext = function (context) {
        this.context = context;
        return this;
    };
    return Task;
}());
exports.default = Task;
//# sourceMappingURL=Task.js.map