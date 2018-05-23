import IRun from "./IRun";
import ITask from "./ITask";

export default interface IJob {
    getId(): string;
    setId(id: string): IJob;
    getTask(): ITask;
    setTask(task: ITask): IJob;
    getLastRun(): IRun;
    setLastRun(lastRun: IRun): IJob;
    getIntervalInMinutes(): number;
    setIntervalInMinutes(interval: number): IJob;
    getRecurrences(): number;
    setRecurrences(recurrences: number): IJob;
    getRunCount(): number;
    setRunCount(count: number): IJob;
    fromDict(obj: {[key: string]: any}): IJob;
    toDict(): {[key: string]: any};
}
