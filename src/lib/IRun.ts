
export default interface IRun {
    getId(): string;
    setId(id: string): void;
    getTimestamp(): number;
    setTimestamp(timestamp: number): void;
    getSuccess(): boolean;
    setSuccess(success: boolean): void;
}
