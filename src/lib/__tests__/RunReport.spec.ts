import IReport from "../IReport";
import RunReport from "../RunReport";

describe("RunReport", () => {
    const testReportId: string = "testReportId";
    const testJobId: string = "testJob1";
    const testTaskCount: number = 5;
    const testSuccess: boolean = true;
    const testTimestamp: number = 123456789;

    const testRunReport: IReport = new RunReport(
        testReportId,
        testJobId,
        testTaskCount,
        testTimestamp,
        testSuccess,
    );

    it("instantiates", () => {
        expect(testRunReport).toBeInstanceOf(RunReport);
    });

    describe("getId", () => {
        expect(testRunReport.getId()).toEqual(testReportId);
    });

    describe("setId", () => {
        const testReport: IReport = new RunReport();
        testReport.setId(testReportId);
        expect(testReport.getId()).toEqual(testReportId);
    });

    describe("getJobId", () => {
        expect(testRunReport.getJobId()).toEqual(testJobId);
    });

    describe("setJobId", () => {
        const testReport: IReport = new RunReport();
        testReport.setJobId(testJobId);
        expect(testReport.getJobId()).toEqual(testJobId);
    });

    describe("getTaskCount", () => {
        expect(testRunReport.getTaskCount()).toEqual(testTaskCount);
    });

    describe("setTaskCount", () => {
        const testReport: IReport = new RunReport();
        testReport.setTaskCount(testTaskCount);
        expect(testReport.getTaskCount()).toEqual(testTaskCount);
    });

    describe("getSuccess", () => {
        expect(testRunReport.getJobId()).toEqual(testJobId);
    });

    describe("setSuccess", () => {
        const testReport: IReport = new RunReport();
        testReport.setSuccess(testSuccess);
        expect(testReport.getSuccess()).toEqual(testSuccess);
    });

    describe("getTimestamp", () => {
        expect(testRunReport.getTimestamp()).toEqual(testTimestamp);
    });

    describe("setTimestamp", () => {
        const testReport: IReport = new RunReport();
        testReport.setTimestamp(testTimestamp);
        expect(testReport.getTimestamp()).toEqual(testTimestamp);
    });
});
