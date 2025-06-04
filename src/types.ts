export type Obj<T = any> = Record<string, T>;

export type Config = {
    input?: string|null,
    output?: string|null,
    depth?: number|null,
    objDepth?: number|null,
    logging?: number|null,
    errorLogging?: number|null,
};
