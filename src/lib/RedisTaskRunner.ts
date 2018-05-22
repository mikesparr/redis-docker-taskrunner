import EnvConfig from "./EnvConfig";
import ITaskRunner from "./ITaskRunner";
import RedisConfig from "./RedisConfig";

export default class RedisTaskRunner implements ITaskRunner {
    protected config: RedisConfig;

    constructor(env: EnvConfig) {
        this.config = new RedisConfig(env.dbHost, env.dbPort, env.dbName, env.dbPass);
    }

    public run(): void {
        console.log("Hello, world");
    }
}
