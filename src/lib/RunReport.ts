import IReport from "./IReport";

export default class RunReport implements IReport {
    protected id: string;
    protected jobId: string;
    protected taskCount: number;
    protected timestamp: number;
    protected success: boolean;

    constructor(
        id?: string,
        jobId?: string,
        taskCount?: number,
        timestamp?: number,
        success?: boolean) {
            this.id = id;
            this.jobId = jobId;
            this.taskCount = taskCount;
            this.timestamp = timestamp;
            this.success = success;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getJobId(): string {
        return this.jobId;
    }

    public setJobId(jobId: string): void {
        this.jobId = jobId;
    }

    public getTaskCount(): number {
        return this.taskCount;
    }

    public setTaskCount(taskCount: number): void {
        this.taskCount = taskCount;
    }

    public getTimestamp(): number {
        return this.timestamp;
    }

    public setTimestamp(timestamp: number): void {
        this.timestamp = timestamp;
    }

    public getSuccess(): boolean {
        return this.success || false;
    }

    public setSuccess(success: boolean): void {
        this.success = success;
    }
}
