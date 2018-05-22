import Run from "../Run";

describe("Run", () => {
    const testId: string = "testRun";
    const testTimestamp: number = 123456789;
    const testSuccess: boolean = true;

    it("instantiates", () => {
        const result: Run = new Run();
        expect(result).toBeInstanceOf(Run);
    });

    describe("getId", () => {
        it("gets id", () => {
            // arrange
            const testRun: Run = new Run();
            testRun.setId(testId);

            // act
            const result: string = testRun.getId();

            // assert
            expect(result).toEqual(testId);
        });
    }); // getId

    describe("setId", () => {
        it("sets id", () => {
            // arrange
            const testRun: Run = new Run();

            // act
            testRun.setId(testId);
            const result: string = testRun.getId();

            // assert
            expect(result).toEqual(testId);
        });
    }); // setId

    describe("getTimestamp", () => {
        it("gets timestamp", () => {
            // arrange
            const testRun: Run = new Run();
            testRun.setTimestamp(testTimestamp);

            // act
            const result: number = testRun.getTimestamp();

            // assert
            expect(result).toEqual(testTimestamp);
        });
    }); // getTimestamp

    describe("setTimestamp", () => {
        it("sets timestamp", () => {
            // arrange
            const testRun: Run = new Run();

            // act
            testRun.setTimestamp(testTimestamp);
            const result: number = testRun.getTimestamp();

            // assert
            expect(result).toEqual(testTimestamp);
        });
    }); // setTimestamp

    describe("getSuccess", () => {
        it("gets success flag", () => {
            // arrange
            const testRun: Run = new Run();
            testRun.setSuccess(testSuccess);

            // act
            const result: boolean = testRun.getSuccess();

            // assert
            expect(result).toEqual(testSuccess);
        });
    }); // getSuccess

    describe("setSuccess", () => {
        it("sets success", () => {
            // arrange
            const testRun: Run = new Run();

            // act
            testRun.setSuccess(testSuccess);
            const result: boolean = testRun.getSuccess();

            // assert
            expect(result).toEqual(testSuccess);
        });
    }); // setSuccess
});
