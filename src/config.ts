import { Obj } from '@/types';
import { getFile } from '@/lib';
import { ObjTooDeepError } from '@/errors';
import * as console from "node:console";
import path from "path";


// Constants

export const DEFAULT_DEPTH = 3;


// Variables

const dir = process.cwd();


// Functions

export function getObjectFile(filename: string, depth: number = DEFAULT_DEPTH): Obj | null {

    // Doing some checks

    if (depth <= 0) throw new ObjTooDeepError(`Unable to read the JSON: The JSON is too deep. Reduce the usage of '@extends' directive or increase the limit.`);


    // Getting the JSON

    const json = getFile(filename);

    if (!json) return null;


    // Parsing the JSON

    const object = JSON.parse(json);


    // If the JSON has a parent

    const jsonExtends = object['@extends'] ?? null;

    if (jsonExtends) {
        const jsonParentFilename = path.join(dir, jsonExtends);
        const jsonParent = getObjectFile(jsonParentFilename, depth - 1) ?? {};
        return { ...jsonParent, ...object };
    }


    return object;
}


export default getObjectFile;
