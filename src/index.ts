import EnvConfig from "./lib/EnvConfig";
import ITaskRunner from "./lib/ITaskRunner";
import RedisTaskRunner from "./lib/RedisTaskRunner";

const envConfig: EnvConfig = new EnvConfig();
const runner: ITaskRunner = new RedisTaskRunner(envConfig);

runner.run()
    .then((success) => {
        process.exit(0);
    })
    .catch((error) => {
        process.exit(1);
    });
