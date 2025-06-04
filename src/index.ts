import fs from 'fs';
import minimist from 'minimist';
import * as path from 'path';
import { Config, Obj } from '@/types';
import { ObjError } from '@/errors';
import { getObjectFile } from '@/config';
import { objToWithVariables, strToWithVariables, DEFAULT_OBJ_DEPTH } from '@/obj';
import config from '../.exjsonarc.json';


// Third-parties

const processArgs = process.argv?.slice(2) ?? [];

const args = minimist(processArgs);


// Constants

export const CONFIG_NAME = '.exjsonarc.json';

export const DEFAULT_INPUT_FILE_NAME = '.input.v.json';

export const DEFAULT_OUTPUT_FILE_NAME = '.output.v.json';

export const DEFAULT_DEPTH = 3;

// export const DEFAULT_LOGGING = 0;

export const DEFAULT_ERROR_LOGGING = 1;


// Variables

const dir = process.cwd();

const inputArg = args?.input ?? null;

const outputArg = args?.output ?? null;

const depthArg = args?.depth ?? null;

const objDepthArg = args?.objDepth ?? null;

const errorLoggingArg = args?.errorLogging ?? null;


// Functions

export function getConfig(): Config {
    const fileConfigPath = path.join(dir, CONFIG_NAME);

    const fileConfig = getObjectFile(fileConfigPath);

    return { ...config, ...fileConfig } as Config;
}

export function fileToObjWithVariables(filename: string, variables: Obj = {}, depth: number = DEFAULT_DEPTH, objDepth: number = DEFAULT_OBJ_DEPTH): Obj {
    const objectFilename = path.join(dir, filename);
    const object = getObjectFile(objectFilename, depth) ?? null;


    // Doing some checks

    if (!object)
        throw new ObjError(`Unable to get the JSON: File '${objectFilename}' does not exist`);


    return objToWithVariables(object, variables, objDepth);
}

export function fileToWithVariables(input: string, output: string, variables: Obj = {}, depth: number = DEFAULT_DEPTH, objDepth: number = DEFAULT_OBJ_DEPTH): void {
    const outputFilename = path.join(dir, output);
    const objWithVariables = fileToObjWithVariables(input, variables, depth, objDepth);
    const result = JSON.stringify(objWithVariables, null, 2);

    fs.writeFile(outputFilename, result, (err) => {
        if (err) throw err;
    });
}

export function use(): void {

    // Loading custom configuration

    const config = getConfig();

    const input = inputArg || config?.input || DEFAULT_INPUT_FILE_NAME;

    const output = outputArg || config?.output || DEFAULT_OUTPUT_FILE_NAME;

    const depth = depthArg ?? config?.depth ?? DEFAULT_DEPTH;

    const objDepth = objDepthArg ?? config?.objDepth ?? DEFAULT_OBJ_DEPTH;

    const errorLogging = errorLoggingArg ?? config?.errorLogging ?? DEFAULT_ERROR_LOGGING;


    // Generating the output

    try {
        fileToWithVariables(input, output, {}, depth, objDepth);
    } catch (e) {
        if (!errorLogging) return;
        throw e;
    }
}


export { getObjectFile, objToWithVariables, strToWithVariables }

export default objToWithVariables;
