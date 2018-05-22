import Job from "../Job";
import Run from "../Run";
import { Task, TaskType } from "../Task";

describe("Job", () => {
    const testId: string = "test";
    const testTask: Task = new Task();
    const testLastRun: Run = new Run();
    const testIntervalInMinutes: number = 1;
    const testRecurrences: number = 2;
    const testRunCount: number = 0;

    it("instantiates", () => {
        const result: Job = new Job();
        expect(result).toBeInstanceOf(Job);
    });

    describe("getId", () => {
        it("gets id", () => {
            // arrange
            const testJob: Job = new Job();
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
            const testJob: Job = new Job();

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
            const testJob: Job = new Job();
            testJob.setTask(testTask);

            // act
            const result: Task = testJob.getTask();

            // assert
            expect(result).toEqual(testTask);
        });
    }); // getTask

    describe("setTask", () => {
        it("sets task", () => {
            // arrange
            const testJob: Job = new Job();

            // act
            testJob.setTask(testTask);
            const result: Task = testJob.getTask();

            // assert
            expect(result).toEqual(testTask);
        });
    }); // setTask

    describe("getLastRun", () => {
        it("gets last run", () => {
            // arrange
            const testJob: Job = new Job();
            testJob.setLastRun(testLastRun);

            // act
            const result: Run = testJob.getLastRun();

            // assert
            expect(result).toEqual(testLastRun);
        });
    }); // getLastRun

    describe("setLastRun", () => {
        it("sets", () => {
            // arrange
            const testJob: Job = new Job();

            // act
            testJob.setLastRun(testLastRun);
            const result: Run = testJob.getLastRun();

            // assert
            expect(result).toEqual(testLastRun);
        });
    }); // setLastRun

    describe("getIntervalInMinutes", () => {
        it("gets interval", () => {
            // arrange
            const testJob: Job = new Job();
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
            const testJob: Job = new Job();

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
            const testJob: Job = new Job();
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
            const testJob: Job = new Job();

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
            const testJob: Job = new Job();
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
            const testJob: Job = new Job();

            // act
            testJob.setRunCount(testRunCount);
            const result: number = testJob.getRunCount();

            // assert
            expect(result).toEqual(testRunCount);
        });
    }); // setRunCount
});
