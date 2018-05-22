import EnvConfig from "./lib/EnvConfig";
import ITaskRunner from "./lib/ITaskRunner";
import RedisTaskRunner from "./lib/RedisTaskRunner";

const envConfig: EnvConfig = new EnvConfig();
const runner: ITaskRunner = new RedisTaskRunner(envConfig);

console.log("Running ...");
runner.run();
console.log("Done");

