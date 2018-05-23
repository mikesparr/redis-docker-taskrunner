
export default interface IReport {
    getId(): string;
    setId(id: string): void;
    getJobId(): string;
    setJobId(jobId: string): void;
    getTaskCount(): number;
    setTaskCount(taskCount: number): void;
    getTimestamp(): number;
    setTimestamp(timestamp: number): void;
    getSuccess(): boolean;
    setSuccess(success: boolean): void;
}
