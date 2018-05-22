import Run from "./Run";
import { Task, TaskType } from "./Task";

export default class Job {
    protected id: string;
    protected task: Task;
    protected lastRun: Run;
    protected interval: number;
    protected recurrences: number;
    protected runCount: number;

    constructor() {
        this.id = "Hello";
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
}
