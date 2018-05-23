import IJob from "../IJob";
import IRun from "../IRun";
import ITask, { TaskType } from "../ITask";

import Job from "../Job";
import Run from "../Run";
import Task from "../Task";

describe("Job", () => {
    const testId: string = "test";
    const testTask: ITask = new Task(TaskType.PubSub, "myChannel", {foo: "bar"});
    const testLastRun: IRun = new Run("run1", 123456789, false);
    const testIntervalInMinutes: number = 1;
    const testRecurrences: number = 2;
    const testRunCount: number = 0;

    it("instantiates", () => {
        const result: IJob = new Job();
        expect(result).toBeInstanceOf(Job);
    });

    describe("getId", () => {
        it("gets id", () => {
            // arrange
            const testJob: IJob = new Job();
            testJob.setId(testId);

            // act
            const result: string = testJob.getId();

            // assert
            expect(result).toEqual(testId);
        });
    }); // getId

    describe("setId", () => {
        it("sets id", () => {
            // arrange
            const testJob: IJob = new Job();

            // act
            testJob.setId(testId);
            const result: string = testJob.getId();

            // assert
            expect(result).toEqual(testId);
        });
    }); // setId

    describe("getTask", () => {
        it("gets task", () => {
            // arrange
            const testJob: IJob = new Job();
            testJob.setTask(testTask);

            // act
            const result: ITask = testJob.getTask();

            // assert
            expect(result).toEqual(testTask);
        });
    }); // getTask

    describe("setTask", () => {
        it("sets task", () => {
            // arrange
            const testJob: IJob = new Job();

            // act
            testJob.setTask(testTask);
            const result: ITask = testJob.getTask();

            // assert
            expect(result).toEqual(testTask);
        });
    }); // setTask

    describe("getLastRun", () => {
        it("gets last run", () => {
            // arrange
            const testJob: IJob = new Job();
            testJob.setLastRun(testLastRun);

            // act
            const result: IRun = testJob.getLastRun();

            // assert
            expect(result).toEqual(testLastRun);
        });
    }); // getLastRun

    describe("setLastRun", () => {
        it("sets", () => {
            // arrange
            const testJob: IJob = new Job();

            // act
            testJob.setLastRun(testLastRun);
            const result: IRun = testJob.getLastRun();

            // assert
            expect(result).toEqual(testLastRun);
        });
    }); // setLastRun

    describe("getIntervalInMinutes", () => {
        it("gets interval", () => {
            // arrange
            const testJob: IJob = new Job();
            testJob.setIntervalInMinutes(testIntervalInMinutes);

            // act
            const result: number = testJob.getIntervalInMinutes();

            // assert
            expect(result).toEqual(testIntervalInMinutes);
        });
    }); // getIntervalInMinutes

    describe("setIntervalInMinutes", () => {
        it("sets interval", () => {
            // arrange
            const testJob: IJob = new Job();

            // act
            testJob.setIntervalInMinutes(testIntervalInMinutes);
            const result: number = testJob.getIntervalInMinutes();

            // assert
            expect(result).toEqual(testIntervalInMinutes);
        });
    }); // setIntervalInMinutes

    describe("getRecurrences", () => {
        it("gets recurrences", () => {
            // arrange
            const testJob: IJob = new Job();
            testJob.setRecurrences(testRecurrences);

            // act
            const result: number = testJob.getRecurrences();

            // assert
            expect(result).toEqual(testRecurrences);
        });
    }); // getRecurrences

    describe("setRecurrences", () => {
        it("sets recurrences", () => {
            // arrange
            const testJob: IJob = new Job();

            // act
            testJob.setRecurrences(testRecurrences);
            const result: number = testJob.getRecurrences();

            // assert
            expect(result).toEqual(testRecurrences);
        });
    }); // setRecurrences

    describe("getRunCount", () => {
        it("gets run count", () => {
            // arrange
            const testJob: IJob = new Job();
            testJob.setRunCount(testRunCount);

            // act
            const result: number = testJob.getRunCount();

            // assert
            expect(result).toEqual(testRunCount);
        });
    }); // getRunCount

    describe("setRunCount", () => {
        it("sets run count", () => {
            // arrange
            const testJob: IJob = new Job();

            // act
            testJob.setRunCount(testRunCount);
            const result: number = testJob.getRunCount();

            // assert
            expect(result).toEqual(testRunCount);
        });
    }); // setRunCount

    describe("fromDict", () => {
        it("deserializes Dictionary into Job class", () => {
            // arrange
            const testJob: IJob = new Job(
                testId,
                testTask,
                testLastRun,
                testIntervalInMinutes,
                testRecurrences,
                testRunCount,
            );

            const testDict: {[key: string]: any} = {
                id: testId,
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

            // act
            const result: IJob = new Job().fromDict(testDict);

            // assert
            expect(result).toEqual(testJob);
        });
    }); // fromJson

    describe("toDict", () => {
        it("serializes Job class into Dictionary", () => {
            // arrange
            const testJob: IJob = new Job(
                testId,
                testTask,
                testLastRun,
                testIntervalInMinutes,
                testRecurrences,
                testRunCount,
            );

            const testDict: {[key: string]: any} = {
                id: testId,
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

            // act
            const result: {[key: string]: any} = testJob.toDict();

            // assert
            expect(result).toEqual(testDict);
        });
    }); // toJson
});
