
import IReport from "./IReport";

export default interface ITaskRunner {
    run(): Promise<IReport>;
}
