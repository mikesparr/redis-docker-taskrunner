import * as redis from "redis";

import EnvConfig from "./EnvConfig";

import IJob from "./IJob";
import IReport from "./IReport";
import IRun from "./IRun";
import ITask, { TaskType } from "./ITask";
import ITaskRunner from "./ITaskRunner";

import Job from "./Job";
import RedisConfig from "./RedisConfig";
import Run from "./Run";
import Task from "./Task";

export default class RedisTaskRunner implements ITaskRunner {
    protected client: redis.RedisClient;
    protected config: RedisConfig;
    protected channel: string;

    constructor(env: EnvConfig) {
        this.config = new RedisConfig(env.dbHost, env.dbPort, env.dbName, env.dbPass);
        this.channel = env.channel;

        try {
            this.connect(this.config);
        } catch (error) {
            throw new Error("Could not connect to database");
        }
    }

    public run(): Promise<IReport> {
        return new Promise((resolve, reject) => {
            this.getPendingJobs()
                .then((pendingJobs) => {
                    console.log({pendingJobs});

                    // if empty, done
                        // create RunReport
                        // resolve(RunReport)
                    // else
                        // jobs = []

                        // forEach
                            // jobs.push(this.handleJob(job));
                        
                        // Promise.all(jobs)
                            // create RunReport
                            // disconnect()
                            // resolve(RunReport) instead of boolean
                        // catch
                            // disconnect()
                            // reject(error)
                })
                .catch((error) => {
                    reject(error); // throw up to caller
                });
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

    protected getPendingJobs(): Promise<IJob[]> {
        return new Promise((resolve, reject) => {
            const min: number = 0;
            const max: number = Math.floor(Date.now() / 1000);
            const key: string = [this.channel, "scheduler", "active"].join(":");

            this.client.zrangebyscore(key, min, max, (err: Error, jobs: string[]) => {
                if (err !== null) {
                    throw new Error("Error fetching jobs from database");
                }

                const pendingJobs: IJob[] = [];

                jobs.map((jobStr: string) => {
                    try {
                        const jobDict: {[key: string]: any} = JSON.parse(jobStr);
                        pendingJobs.push(new Job().fromDict(jobDict));
                    } catch (error) {
                        reject(new Error("Error parsing JSON"));
                    }
                });

                resolve(pendingJobs);
            });
        });
    }

    protected handleJob(job: IJob): Promise<void> {
        return new Promise((resolve, reject) => {
            // create new Run
            // handleTask
            // increment runCount

            // lastRun = recurrences > 0 && recurrences === runCount ? true : false;

            // if lastRun
                // removeJob from active list
                // add to completed list
            // else
                // saveJob 
                // increment with new interval score
            
            resolve();
        });
    }

    protected saveJob(job: IJob): Promise<void> {
        return new Promise((resolve, reject) => {
            const jobDict: {[key: string]: any} = job.toDict();
            const key: string = [this.channel, "job"].join(":");

            try {
                const jobStr: string = JSON.stringify(jobDict);

                this.client.set(key, jobStr, (err: Error, reply: string) => {
                    if (err !== null) {
                        throw new Error(`Error saving job ${key}`);
                    }
                });
            } catch (error) {
                reject(new Error("Error converting obj to JSON string"));
            }
        });
    }

    protected removeJob(key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    protected handleTask(task: ITask): Promise<IRun> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}
