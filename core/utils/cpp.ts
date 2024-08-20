/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/

import { errors } from "../errors";
import { symbols } from "../symbols";
import { LYNX_TYPES_LIST } from "../type/types";

// Piece of code written by AndrewNation

const fs = require("fs");

function compileCPP(input, output) { }

let tree = [];

function generate(code: string[]) {
  for (let line = 0; line < code.length; line++) {

  }
}

export function transpileToCPP(code: string[], output: string) {
  const template = fs.readFileSync("./template/base.cpp", "utf-8");
  const template_end = fs.readFileSync("./template/part2.cpp", "utf-8");

  const baseTemplate = template.split("/n");
  const part2Template = template_end.split("/n");
  let finalCode = [];

  let _code = code;

  finalCode = baseTemplate

  for (let line = 0; line < code.length; line++) {
    finalCode.push(code[line]);
  }

  finalCode.push("}");

  for (let line = 0; line < part2Template.length; line++) {
    finalCode.push(part2Template[line])
  }

  fs.writeFile(output, finalCode.join("\n"), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Successfully wrote data to ${output}`);
    }
  });
}

export function generateCPPVariableDeclarationStatement(
  tokens: string[],
  pos: number
): string[] {
  let vectorOfTokens: string[] = tokens;

  for (let tk = pos; tk < tokens.length; tk++) {
    if (tokens[tk].includes(symbols.TYPE_ANNOTATION)) {
      let variableWithType = [] as string[];
      let isValidType = false;
      let hasTypeDeclaration = false;

      variableWithType = tokens[tk].split(symbols.TYPE_ANNOTATION);

      for (let _type = 0; _type < LYNX_TYPES_LIST.length; _type++) {
        if (variableWithType[1].includes(LYNX_TYPES_LIST[_type])) {
          isValidType = true;
          hasTypeDeclaration = true;
        }
      }

      if (!isValidType) {
        throw (errors.INVALID_TYPE_OR_MISMATCH);
      }

      if (!hasTypeDeclaration) {
        throw (errors.MISSING_TYPE_DECL);
      }

      console.log(vectorOfTokens)

      let id = variableWithType[1]
      let val = variableWithType[3]
      let type = variableWithType[1].split(":")[1]

      vectorOfTokens = [type, id, "=", val]
      console.log(vectorOfTokens)

      //vectorOfTokens[tk] = variableWithType[0];
    }
  }

  return vectorOfTokens;
}