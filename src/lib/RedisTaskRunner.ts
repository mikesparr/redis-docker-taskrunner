import * as redis from "redis";

import EnvConfig from "./EnvConfig";
import ITaskRunner from "./ITaskRunner";
import Job from "./Job";
import RedisConfig from "./RedisConfig";
import Run from "./Run";
import { Task, TaskType } from "./Task";

export default class RedisTaskRunner implements ITaskRunner {
    protected client: redis.RedisClient;
    protected config: RedisConfig;
    protected channel: string;

    constructor(env: EnvConfig) {
        this.config = new RedisConfig(env.dbHost, env.dbPort, env.dbName, env.dbPass);
        this.channel = env.channel;

        try {
            this.connect(this.config);
        } catch(error) {
            throw new Error("Could not connect to database");
        }
    }

    public run(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("Hello, world");
                resolve(true);
            }, 2500);
        });
    }

    protected connect(config: RedisConfig): RedisTaskRunner {
        const options: {[key: string]: any} = {
            host: config.host,
            port: config.port,
            retry_strategy: (status: any) => {
                if (status.error && status.error.code === "ECONNREFUSED") {
                    // End reconnecting on a specific error and flush all commands
                    return new Error("The server refused the connection");
                }
                if (status.total_retry_time > 1000 * 60 * 60) {
                    // End reconnecting after a specific timeout and flush all commands
                    return new Error("Retry time exhausted");
                }
                if (status.attempt > 10) {
                    // End reconnecting with built in error
                    return undefined;
                }
                // reconnect after
                return Math.min(status.attempt * 100, 3000);
            },
        };
        if (config.db) { options.db = config.db; }
        if (config.password) { options.password = config.password; }

        this.client = redis.createClient(options);
        return this;
    }

    protected disconnect(): RedisTaskRunner {
        this.client.end();
        return this;
    }

    protected getPendingJobs(): Promise<Job[]> {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }

    protected saveJob(job: Job): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    protected handleTask(task: Task): Promise<Run> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}
