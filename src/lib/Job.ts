import Run from "./Run";
import { Task, TaskType } from "./Task";

export default class Job {
    protected id: string;
    protected task: Task;
    protected lastRun: Run;
    protected interval: number;
    protected recurrences: number;
    protected runCount: number;

    constructor(
        id?: string, 
        task?: Task, 
        lastRun?: Run, 
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

    public setId(id: string): Job {
        this.id = id;
        return this;
    }

    public getTask(): Task {
        return this.task;
    }

    public setTask(task: Task): Job {
        this.task = task;
        return this;
    }

    public getLastRun(): Run {
        return this.lastRun;
    }

    public setLastRun(lastRun: Run): Job {
        this.lastRun = lastRun;
        return this;
    }

    public getIntervalInMinutes(): number {
        return this.interval;
    }

    public setIntervalInMinutes(interval: number): Job {
        this.interval = interval;
        return this;
    }

    public getRecurrences(): number {
        return this.recurrences;
    }

    public setRecurrences(recurrences: number): Job {
        this.recurrences = recurrences;
        return this;
    }

    public getRunCount(): number {
        return this.runCount;
    }

    public setRunCount(count: number): Job {
        this.runCount = count;
        return this;
    }

    public fromDict(obj: {[key: string]: any}): Job {
        const newRun: Run = new Run(
            obj.lastRun.id,
            obj.lastRun.timestamp,
            obj.lastRun.success,
        );

        const newTask: Task = new Task(
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
            task: {
                type: this.task.getType(),
                target: this.task.getTarget(),
                context: this.task.getContext(),
            },
            lastRun: {
                id: this.lastRun.getId(),
                timestamp: this.lastRun.getTimestamp(),
                success: this.lastRun.getSuccess(),
            },
            intervalInMinutes: this.interval,
            recurrences: this.recurrences,
            runCount: this.runCount,
        }

        return obj;
    }
}
