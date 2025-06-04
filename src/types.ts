export type Obj<T = any> = Record<string, T>;

export type Config = {
    input?: string | 0,
    output: string,
    depth: number,
    objDepth: number,
    logging: number,
    errorLogging: number,
};
