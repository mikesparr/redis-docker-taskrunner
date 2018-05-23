import IJob from "./IJob";
import IRun from "./IRun";
import ITask from "./ITask";

import { TaskType } from "./ITask";
import Run from "./Run";
import Task from "./Task";

export default class Job implements IJob {
    protected id: string;
    protected task: ITask;
    protected lastRun: IRun;
    protected interval: number;
    protected recurrences: number;
    protected runCount: number;

    constructor(
        id?: string,
        task?: ITask,
        lastRun?: IRun,
        intervalInMinutes?: number,
        recurrences?: number,
        runCount?: number) {
            this.id = id;
            this.task = task;
            this.lastRun = lastRun;
            this.interval = intervalInMinutes;
            this.recurrences = recurrences;
            this.runCount = runCount;

            return this;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): IJob {
        this.id = id;
        return this;
    }

    public getTask(): ITask {
        return this.task;
    }

    public setTask(task: ITask): IJob {
        this.task = task;
        return this;
    }

    public getLastRun(): IRun {
        return this.lastRun;
    }

    public setLastRun(lastRun: Run): IJob {
        this.lastRun = lastRun;
        return this;
    }

    public getIntervalInMinutes(): number {
        return this.interval;
    }

    public setIntervalInMinutes(interval: number): IJob {
        this.interval = interval;
        return this;
    }

    public getRecurrences(): number {
        return this.recurrences;
    }

    public setRecurrences(recurrences: number): IJob {
        this.recurrences = recurrences;
        return this;
    }

    public getRunCount(): number {
        return this.runCount;
    }

    public setRunCount(count: number): IJob {
        this.runCount = count;
        return this;
    }

    public fromDict(obj: {[key: string]: any}): IJob {
        const newRun: IRun = new Run(
            obj.lastRun.id,
            obj.lastRun.timestamp,
            obj.lastRun.success,
        );

        const newTask: ITask = new Task(
            TaskType.PubSub,
            obj.task.target,
            obj.task.context,
        );

        this.id = obj.id;
        this.task = newTask;
        this.lastRun = newRun;
        this.interval = obj.intervalInMinutes;
        this.recurrences = obj.recurrences;
        this.runCount = obj.runCount;

        return this;
    }

    public toDict(): {[key: string]: any} {
        const obj: {[key: string]: any} = {
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
    }
}
