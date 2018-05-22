
export default class EnvConfig {
    public schedulerName: string;
    public channel: string;
    public dbHost: string;
    public dbPort: number;
    public dbName: number;
    public dbPass: string;

    constructor() {
        // set values from process.env or default
        this.schedulerName = process.env.SCHEDULER_NAME || "Default";
        this.channel = process.env.SCHEDULER_CHANNEL || "scheduler";
        this.dbHost = process.env.SCHEDULER_DB_HOST || "localhost";
        this.dbPort = +process.env.SCHEDULER_DB_PORT || 6379; // Redis default
        this.dbName = +process.env.SCHEDULER_DB_NAME || 0;
        this.dbPass = process.env.SCHEDULER_DB_PASS || undefined;
    }

    public getSchedulerName(): string {
        return this.schedulerName;
    }

    public getChannel(): string {
        return this.channel;
    }

    public getDbHost(): string {
        return this.dbHost;
    }

    public getDbPort(): number {
        return this.dbPort;
    }

    public getDbName(): number {
        return this.dbName;
    }

    public getDbPass(): string {
        return this.dbPass;
    }
}
