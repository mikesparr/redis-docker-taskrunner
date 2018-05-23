export enum TaskType {
    PubSub = "publish",
}

export default interface ITask {
    getType(): TaskType;
    setType(type: TaskType): void;
    getTarget(): string;
    setTarget(target: string): void;
    getContext(): {[key: string]: any};
    setContext(context: {[key: string]: any}): void;
}
