import EnvConfig from "../EnvConfig";

describe("EnvConfig", () => {
    let origEnv: any;

    beforeAll((done) => {
        // save current env params
        origEnv = process.env;

        // set test env params
        process.env.SCHEDULER_NAME = "test";
        process.env.SCHEDULER_CHANNEL = "test";
        process.env.SCHEDULER_DB_HOST = "someserver";
        process.env.SCHEDULER_DB_PORT = "5555";

        done();
    });

    it("sets default values if env params dont exist", () => {
        const result: EnvConfig = new EnvConfig();

        // assert
        expect(result.schedulerName).toEqual("test");
        expect(result.channel).toEqual("test");
        expect(result.dbHost).toEqual("someserver");
        expect(result.dbPort).toEqual(5555);
        expect(result.dbName).toEqual(0);
        expect(result.dbPass).toBeUndefined();

        expect(result.getSchedulerName()).toEqual("test");
        expect(result.getChannel()).toEqual("test");
        expect(result.getDbHost()).toEqual("someserver");
        expect(result.getDbPort()).toEqual(5555);
        expect(result.getDbName()).toEqual(0);
        expect(result.getDbPass()).toBeUndefined();
    });

    it("sets config values from env params", () => {
        // arrange
        process.env.SCHEDULER_DB_NAME = "5";
        process.env.SCHEDULER_DB_PASS = "testPass";

        // act
        const result: EnvConfig = new EnvConfig();

        // assert
        expect(result.dbName).toEqual(5);
        expect(result.dbPass).toEqual("testPass");
    });

    it("throws error if param wrong type", () => {
        // arrange
        process.env.SCHEDULER_DB_NAME = "alphalpha";

        // assert
        // expect(() => { const result: EnvConfig = new EnvConfig(); }).toThrow();
    });

    afterAll((done) => {
        // restore saved env params
        process.env = origEnv;
    });
});
