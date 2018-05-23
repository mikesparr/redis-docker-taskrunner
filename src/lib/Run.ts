import IRun from "./IRun";

export default class Run implements IRun {
    protected id: string;
    protected timestamp: number;
    protected success: boolean;

    constructor(id?: string, timestamp?: number, success?: boolean) {
        this.id = id;
        this.timestamp = timestamp;
        this.success = success;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): Run {
        this.id = id;
        return this;
    }

    public getTimestamp(): number {
        return this.timestamp;
    }

    public setTimestamp(timestamp: number): Run {
        this.timestamp = timestamp;
        return this;
    }

    public getSuccess(): boolean {
        return this.success;
    }

    public setSuccess(success: boolean): Run {
        this.success = success;
        return this;
    }
}
