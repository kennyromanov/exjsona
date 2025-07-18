import { Obj } from '@/types';
import fs from 'fs';
import { ObjParseError } from '@/errors';


// Functions

export function isset(val: any): boolean {
    return val !== null && val !== undefined;
}

export function isObject(val: any): val is Obj {
    return isset(val) && typeof val === 'object';
}

export function isArray(val: any): val is any[] {
    return Array.isArray(val);
}

export function getValue(name: string, val: Obj): any {

    // Getting the name items

    const nameItems = name?.split('.') ?? null;

    if (!nameItems || !nameItems?.length)
        throw new ObjParseError(`Unable to get the value: Name '${name}' is not valid'`);


    // Getting the value

    let cursor: any = val;

    for (const nameItem of nameItems) {
        cursor = cursor[nameItem];

        if (!isset(cursor)) return null;
    }


    return cursor;
}

export function getFile(filename: string): string|null {
    const isFile = fs.existsSync(filename);

    if (isFile)
        return fs.readFileSync(filename, 'utf-8');
    else
        return null;
}


// Helpers

export class RegexHelper {
    public static jsonVar = /\{(?<name>[a-zA-Z0-9.]+)\}/g;
}
