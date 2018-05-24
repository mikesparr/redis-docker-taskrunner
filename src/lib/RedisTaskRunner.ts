import * as redis from "redis";

import {
    IJob,
    IRun,
    ITask,
    Job,
    Run,
    Task,
    TaskType,
} from "redis-task-scheduler";

import EnvConfig from "./EnvConfig";
import IReport from "./IReport";
import ITaskRunner from "./ITaskRunner";
import RedisConfig from "./RedisConfig";
import RunReport from "./RunReport";


enum JobStatus {
    Active = "active",
    Completed = "completed",
    Failed = "failed",
}

export default class RedisTaskRunner implements ITaskRunner {
    protected client: redis.RedisClient;
    protected config: RedisConfig;
    protected channel: string;

    protected readonly REDIS_JOBS_TYPE: string = "jobs";
    protected readonly REDIS_JOB_TYPE: string = "job";

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
                    const runReport: IReport = new RunReport(
                        `run-${Date.now()}`, null, 0, Date.now(), true);

                    if (pendingJobs.length === 0) {
                        resolve(runReport);
                    } else {
                        const jobs: Array<Promise<void>> = [];

                        pendingJobs.map((pendingJob) => {
                            jobs.push(this.handleJob(pendingJob));
                        });

                        Promise.all(jobs)
                            .then((values) => {
                                runReport.setTaskCount(values.length);
                                this.disconnect();
                                resolve(runReport);
                            })
                            .catch((error) => {
                                this.disconnect();
                                reject(error);
                            });
                    }
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
        this.client.end(false);
        return this;
    }

    protected getPendingJobs(): Promise<IJob[]> {
        return new Promise((resolve, reject) => {
            const min: number = 0;
            const max: number = Math.floor(Date.now() / 1000);
            const key: string = this.getJobsKey(JobStatus.Active);

            this.client.zrangebyscore(key, min, max, (err: Error, jobKeys: string[]) => {
                if (err !== null) {
                    throw new Error("Error fetching jobs from database");
                }

                const fetchJobs: Array<Promise<IJob>> = [];

                jobKeys.map((jobKey: string) => {
                    fetchJobs.push(this.getJob(jobKey));
                });

                Promise.all(fetchJobs)
                    .then((pendingJobs) => {
                        resolve(pendingJobs);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        });
    }

    protected handleJob(job: IJob): Promise<void> {
        return new Promise((resolve, reject) => {
            // handle task (Redis function dynamic based on type [default: publish])
            const task: ITask = job.getTask();
            this.client[task.getType()](
                task.getTarget(),
                JSON.stringify(task.getContext()),
                (targetErr: Error, reply: any) => {
                    if (targetErr !== null) {
                        throw targetErr;
                    }

                    // save current run
                    job.setRunCount(job.getRunCount() + 1);
                    job.setLastRun(new Run(`run-${Date.now()}`, Date.now(), true));

                    // check if last run
                    const repeats: number = job.getRecurrences();
                    // TODO: move to class (i.e. isLastRun)
                    const lastRun: boolean = repeats > 0 && repeats === job.getRunCount() ? true : false;

                    if (lastRun) {
                        this.client.multi()
                            .zrem(this.getJobsKey(JobStatus.Active), this.getJobKey(job))
                            .zadd(this.getJobsKey(JobStatus.Completed), this.generateJobScore(), this.getJobKey(job))
                            .exec((err: Error, replies: string[]) => { // TODO: save job too
                                if (err !== null) {
                                    reject(err);
                                }

                                resolve();
                            });
                    } else {
                        const nextRun: number = job.getIntervalInMinutes() * 60000;
                        this.client.multi()
                            .set(this.getJobKey(job), JSON.stringify(job.toDict()))
                            .zincrby(this.getJobsKey(JobStatus.Active), nextRun, this.getJobKey(job))
                            .exec((err: Error, replies: string[]) => {
                                if (err !== null) {
                                    reject(err);
                                }

                                resolve();
                            });
                    }
            }); // task
        }); // Promise
    }

    protected getJob(key: string): Promise<IJob> {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err: Error, jobJson: string) => {
                if (err !== null) {
                    throw new Error(`Error saving job ${key}`);
                }

                // parse JSON and return IJob
                try {
                    const jobDict: {[key: string]: any} = JSON.parse(jobJson);
                    const job: IJob = new Job().fromDict(jobDict);
                    resolve(job);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    protected saveJob(job: IJob): Promise<void> {
        return new Promise((resolve, reject) => {
            const jobDict: {[key: string]: any} = job.toDict();

            try {
                const jobStr: string = JSON.stringify(jobDict);
                const jobKey: string = this.getJobKey(job);

                this.client.set(jobKey, jobStr, (err: Error, reply: string) => {
                    if (err !== null) {
                        throw new Error(`Error saving job ${jobKey}`);
                    }
                });
            } catch (error) {
                reject(new Error("Error converting obj to JSON string"));
            }
        });
    }

    protected removeJob(key: string): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.client.del(key, (err: Error, reply: number) => {
                    if (err !== null) {
                        throw new Error(`Error removing job ${key}`);
                    }

                    resolve();
                });
            } catch (error) {
                reject(new Error("Error converting obj to JSON string"));
            }
        });
    }

    protected generateJobScore(): number {
        return Math.floor(Date.now() / 1000);
    }

    protected getJobsKey(status: string): string {
        return [this.channel, this.REDIS_JOBS_TYPE, status].join(":"); // TODO: change status to enum
    }

    protected getJobKey(job: IJob): string {
        return [this.channel, this.REDIS_JOB_TYPE, job.getId()].join(":");
    }
}
