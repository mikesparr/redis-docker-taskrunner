import ITask, { TaskType } from "./ITask";

export default class Task implements ITask {
    protected type: TaskType;
    protected target: string;
    protected context: {[key: string]: any};

    constructor(type?: TaskType, target?: string, context?: {[key: string]: any}) {
        this.type = type;
        this.target = target;
        this.context = context;
    }

    public getType(): TaskType {
        return this.type;
    }

    public setType(type: TaskType): Task {
        this.type = type;
        return this;
    }

    public getTarget(): string {
        return this.target;
    }

    public setTarget(target: string): Task {
        this.target = target;
        return this;
    }

    public getContext(): {[key: string]: any} {
        return this.context;
    }

    public setContext(context: {[key: string]: any}): Task {
        this.context = context;
        return this;
    }
}
