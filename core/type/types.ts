/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/

// Piece of code written by AndrewNation

export type ILynxTypes = "int" | "str" | "char" | "bool" | "float" | "double";

export type TTokens = Array<Array<string>>

export interface IVarOrConst {
   id: string;
   value: string;
} 

export type TToken = string;

export const JSTypeDictionary = {
    "bool": "Boolean",
    "int": "parseInt",
    "str": "String",
    "char": "",
    "double": "",
    "float": "parseFloat",
}

export const CPPTypeDictionary = {
    "bool": "Boolean",
    "int": "parseInt",
    "str": "String",
    "char": "",
    "double": "",
    "float": "parseFloat",
}

export const LYNX_TYPES_LIST = ["int", "str", "char", "bool", "float", "double"];