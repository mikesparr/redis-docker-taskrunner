import * as redis from "redis";

import EnvConfig from "../EnvConfig";
import IReport from "../IReport";
import IRun from "../IRun";
import ITask, { TaskType } from "../ITask";
import ITaskRunner from "../ITaskRunner";
import RedisTaskRunner from "../RedisTaskRunner";
import Run from "../Run";
import Task from "../Task";

describe("RedisTaskRunner", () => {
    const config: EnvConfig = new EnvConfig();
    const client: redis.RedisClient = redis.createClient();

    const testTask: ITask = new Task(TaskType.PubSub, "myChannel", {foo: "bar"});
    const testLastRun: IRun = new Run("run1", 123456789, false);
    const testIntervalInMinutes: number = 1;
    const testRecurrences: number = 2;
    const testRunCount: number = 0;
    const testJobScore1: number = Math.floor(Date.now() / 1000) - 90000; // in the past
    const testJobScore2: number = Math.floor(Date.now() / 1000) + 90000; // in the future

    const testJobId: string = "testJob1";
    const testJobKey: string = [config.getChannel(), "job", testJobId].join(":");
    const testJobDict: {[key: string]: any} = {
        id: testJobId,
        intervalInMinutes: testIntervalInMinutes,
        lastRun: testLastRun,
        recurrences: testRecurrences,
        runCount: testRunCount,
        task: {
            context: testTask.getContext(),
            target: testTask.getTarget(),
            type: testTask.getType(),
        },
    };

    const activeJobsKey: string = [config.getChannel(), "jobs", "active"].join(":"); // TODO: enum
    const failedJobsKey: string = [config.getChannel(), "jobs", "failed"].join(":");
    const completedJobsKey: string = [config.getChannel(), "jobs", "completed"].join(":");

    it("instantiates", () => {
        const result: ITaskRunner = new RedisTaskRunner(config);
        expect(result).toBeInstanceOf(RedisTaskRunner);
    });

    describe("run", () => {
        beforeAll((done) => {
            done();
        });

        afterEach((done) => {
            // delete test keys from database
            client.multi()
                .del(testJobKey)
                .del(activeJobsKey)
                .del(failedJobsKey)
                .del(completedJobsKey)
                .exec((err: Error, replies: string[]) => {
                    if (err !== null) {
                        done.fail(err);
                    }

                    done();
                });
        });

        it("returns IReport with results even if no tasks", (done) => {
            // arrange
            const runner: ITaskRunner = new RedisTaskRunner(config);

            // act
            runner.run()
                .then((report) => {
                    // assert
                    expect(report).toBeDefined();
                    expect(report.getSuccess()).toBeTruthy();
                    expect(report.getTaskCount()).toEqual(0);
                    done();
                })
                .catch((error) => {
                    done.fail(error);
                });
        });

        it("skips future tasks from active jobs database", (done) => {
            // arrange
            const runner: ITaskRunner = new RedisTaskRunner(config);

            client.zadd(activeJobsKey, testJobScore2, testJobKey, (zaddErr: Error, reply: number) => {
                if (zaddErr !== null) {
                    done.fail(zaddErr);
                }

                client.set(testJobKey, JSON.stringify(testJobDict), (setErr: Error, reply: string) => {
                    if (setErr !== null) {
                        done.fail(setErr);
                    }

                    // act
                    runner.run()
                        .then((report) => {
                            // assert
                            expect(report).toBeDefined();
                            expect(report.getSuccess()).toBeTruthy();
                            expect(report.getTaskCount()).toEqual(0);
                            done();
                        })
                        .catch((error) => {
                            done.fail(error);
                        });
                });
            });
        });

        it("processes pending tasks from active jobs database", (done) => {
            // arrange
            const runner: ITaskRunner = new RedisTaskRunner(config);

            client.zadd(activeJobsKey, testJobScore1, testJobKey, (zaddErr: Error, reply: number) => {
                if (zaddErr !== null) {
                    done.fail(zaddErr);
                }

                client.set(testJobKey, JSON.stringify(testJobDict), (setErr: Error, reply: string) => {
                    if (setErr !== null) {
                        done.fail(setErr);
                    }

                    // act
                    runner.run()
                        .then((report) => {
                            // assert
                            expect(report).toBeDefined();
                            expect(report.getSuccess()).toBeTruthy();
                            expect(report.getTaskCount()).toEqual(1);
                            done();
                        })
                        .catch((error) => {
                            done.fail(error);
                        });
                });
            });
        });

        it("places recurring jobs in active database with new timestamp", (done) => {
            done();
        });

        it("flags jobs as completed once runCount === recurrences", (done) => {
            done();
        });

        it("schedules repeat jobs with recurrences === 0 indefinitely", (done) => {
            done();
        });

        it("places completed jobs in completed jobs database", (done) => {
            done();
        });

        it("places failed jobs in failed jobs database", (done) => {
            done();
        });

        it("publishes tasks to defined PubSub channel", (done) => {
            done();
        });
    });
});
