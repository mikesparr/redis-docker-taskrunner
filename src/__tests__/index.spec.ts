import EnvConfig from "../lib/EnvConfig";
import ITaskRunner from "../lib/ITaskRunner";
import RedisConfig from "../lib/RedisConfig";
import RedisTaskRunner from "../lib/RedisTaskRunner";

describe("TaskRunner", () => {
    const config: EnvConfig = new EnvConfig();
    const runner: ITaskRunner = new RedisTaskRunner(config);

    it("runs", (done) => {
        const spy = jest.spyOn(runner, "run");

        runner.run()
            .then((report) => {
                expect(spy).toHaveBeenCalled();
                done();
            })
            .catch((error) => {
                done.fail(error);
            });
    });
});
