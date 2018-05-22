import { Task, TaskType } from "../Task";

describe("Task", () => {
    const testType: TaskType = TaskType.PubSub;
    const testTarget: string = "testChannel";
    const testContext: {[key: string]: any} = {foo: "bar"};

    it("instantiates", () => {
        const result: Task = new Task();
        expect(result).toBeInstanceOf(Task);
    });

    describe("getType", () => {
        it("gets type", () => {
            // arrange
            const testTask: Task = new Task();
            testTask.setType(testType);

            // act
            const result: TaskType = testTask.getType();

            // assert
            expect(result).toEqual(testType);
        });
    }); // getType

    describe("setType", () => {
        it("sets type", () => {
            // arrange
            const testTask: Task = new Task();

            // act
            testTask.setType(testType);
            const result: TaskType = testTask.getType();

            // assert
            expect(result).toEqual(testType);
        });
    }); // setType

    describe("getTarget", () => {
        it("gets target", () => {
            // arrange
            const testTask: Task = new Task();
            testTask.setTarget(testTarget);

            // act
            const result: string = testTask.getTarget();

            // assert
            expect(result).toEqual(testTarget);
        });
    }); // getTarget

    describe("setTarget", () => {
        it("sets target", () => {
            // arrange
            const testTask: Task = new Task();

            // act
            testTask.setTarget(testTarget);
            const result: string = testTask.getTarget();

            // assert
            expect(result).toEqual(testTarget);
        });
    }); // setTarget

    describe("getContext", () => {
        it("gets context", () => {
            // arrange
            const testTask: Task = new Task();
            testTask.setContext(testContext);

            // act
            const result: {[key: string]: any} = testTask.getContext();

            // assert
            expect(result).toEqual(testContext);
        });
    }); // getContext

    describe("setContext", () => {
        it("sets timestamp", () => {
            // arrange
            const testTask: Task = new Task();

            // act
            testTask.setContext(testContext);
            const result: {[key: string]: any} = testTask.getContext();

            // assert
            expect(result).toEqual(testContext);
        });
    }); // setContext
});
