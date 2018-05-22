import EnvConfig from "./EnvConfig";
import ITaskRunner from "./ITaskRunner";
import RedisConfig from "./RedisConfig";

export default class RedisTaskRunner implements ITaskRunner {
    protected config: RedisConfig;
    protected channel: string;

    constructor(env: EnvConfig) {
        this.config = new RedisConfig(env.dbHost, env.dbPort, env.dbName, env.dbPass);
        this.channel = env.channel;
    }

    public run(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("Hello, world");
                resolve(true);
            }, 2500);
        });
    }
}
