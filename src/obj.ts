import { Obj } from '@/types';
import {isset, isObject, getValue, RegexHelper, isArray} from '@/lib';
import { ObjError, ObjParseError } from '@/errors';


// Constants

export const DEFAULT_OBJ_DEPTH = 3;


// Functions

export function strToWithVariables(val: string, variables: Obj = {}): string {
    const matches = val?.matchAll(RegexHelper?.jsonVar) ?? [];
    let result = val;


    // Mapping all the variables

    for (const match of matches) {
        const variableName = match?.groups?.name ?? null;
        const variableValue = getValue(variableName, variables);
        const variableStr = '{' + variableName + '}';


        // Doing som checks

        if (!variableName)
            throw new ObjError(`Unable to get the string with variables: Unknown error`);

        if (!isset(variableValue))
            throw new ObjParseError(`Unable to get the string with variables: Variable '${variableName}' is not set`);


        result = result.replace(variableStr, variableValue);
    }


    return result;
}

export function objToWithVariables(val: Obj, variables: Obj = {}, depth: number = DEFAULT_OBJ_DEPTH): Obj {

    // Doing some checks

    if (depth <= 0)
        throw new ObjError(`Unable to get the object with variables: The object is too deep: '${depth}'`);


    // Iterating for each property

    const result: Obj = {};

    for (const key in val) {
        if (!val.hasOwnProperty(key)) continue;


        // Getting the data

        const value = val[key];
        const newVariables = { ...result, ...variables };


        // Transforming the value

        if (isArray(value)) result[key] = value.map(i => {
            if (isObject(i))
                return objToWithVariables(i, newVariables, depth - 1);
            else if (typeof i === 'string')
                return strToWithVariables(i, newVariables);
            else
                return i;
        });

        else if (isObject(value))
            result[key] = objToWithVariables(value, newVariables, depth - 1);

        else if (typeof value === 'string')
            result[key] = strToWithVariables(value, newVariables);

        else
            result[key] = value;
    }


    return result;
}


export default objToWithVariables;
