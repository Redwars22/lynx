/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/

import { errors } from "./errors";
import { keywords } from "./keywords";
import { symbols } from "./symbols";
import { LynxTerminal } from "./utils/terminal";
import { getTokenKind, TOKEN_TYPES } from "./utils/tokens";

const fs = require("fs");
const prompt = require("prompt-sync")();

const identifiers = [] as {
  id?: string;
  type?: "function" | "constant" | "variable" | "method" | "class";
}[];

let jsCode: string[] = [];

export function transpile(code: string[], output: string) {
  fs.writeFile(output, code.join("\n"), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

let code: string[] = [];

try {
  //If there are no arguments, then init the AndrewLang terminal mode
  if (!process.argv[2]) {
    let running = true;
    console.log(LynxTerminal.messages.welcome + "\n");

    while (running) {
      let _code = [];
      jsCode = [];
      _code.push(prompt(">>> "));
      try {
        eval(jsCode.join("\n"));
      } catch (err) {
        console.log("Fatal: ", err);
      }

    }
  } else {
    let input = process.argv[2];
    let target = process.argv[3];
    let output = process.argv[4];

    if (!input.includes(".lx")) throw errors.INVALID_SOURCE;

    const data = fs.readFileSync(input, "utf-8");
    code = data.split("\n");

    interface IToken {
      kind: string;
      value: any;
    }

    let tokensTree = [] as IToken[][];
    let JSTree = [];

    //Init the std library
    JSTree.push(["const", "stdlib", "=", "require('./lib/stdlib.js')"])
    JSTree.push(["const", "std", "=", "new", "stdlib.STD()"])

    for (let i = 0; i < code.length; i++) {
      let line = [];
      let _tokens = code[i].trim().split(" ");
      for (let j = 0; j < _tokens.length; j++) {
        line.push({ "kind": getTokenKind(_tokens[j]), "value": _tokens[j] });
      }

      tokensTree.push(line);
    }

    console.log(tokensTree);

    for (let i = 0; i < tokensTree.length; i++) {
      let lineTokens: string[] = [];
      let _lineTok = tokensTree[i];

      for (let tok = 0; tok < _lineTok.length; tok++) {
        if (_lineTok[tok].kind == TOKEN_TYPES.KEYWORD) {
          if (_lineTok[tok].value == keywords.IF_KEYWD) {
            _lineTok[tok].value = "if";
          }
        }

        if (_lineTok[tok].kind == TOKEN_TYPES.KEYWORD) {
          if (_lineTok[tok].value == keywords.FUNC_DECL) {
            _lineTok[tok].value = "function";
          }
        }

        if (_lineTok[tok].kind == TOKEN_TYPES.KEYWORD) {
          if (_lineTok[tok].value == keywords.FUNC_RET_KEYWD) {
            _lineTok[tok].value = "return";
          }
        }

        lineTokens.push(_lineTok[tok].value)
      }

      JSTree.push(lineTokens);
    }

    console.log(JSTree);

    fs.writeFile("tree.json", JSON.stringify(tokensTree), (err) => { })
    fs.writeFile("js_tree.json", JSON.stringify(JSTree), (err) => { })

    for (let line = 0; line < JSTree.length; line++) {
      //Transform before joining to string
      if (JSTree[line][0] == keywords.IF_KEYWD) {
        const ifExprLine = [];

        ifExprLine.push(JSTree[line][0]);
        ifExprLine.push(symbols.OPENING_PARENTHESIS);

        for (let _tok = 1; _tok < JSTree[line].length; _tok++) {
          if (_tok == JSTree[line].length - 1)
            if (
              JSTree[line][_tok] == symbols.OPENING_CURLY_BRACKET
            ) {
              ifExprLine.push(symbols.CLOSING_PARENTHESIS)
              ifExprLine.push(symbols.OPENING_CURLY_BRACKET)
              break;
            } else {
              ifExprLine.push(symbols.CLOSING_PARENTHESIS);
              break;
            }

          ifExprLine.push(JSTree[line][_tok]);
        }

        JSTree[line] = ifExprLine;
      }

      JSTree[line] = JSTree[line].join(" ");
    }

    //parse(tokenize(code));
    transpile(JSTree, output);
  }
  /*
  if(process.argv[4]) {
    let arg = process.argv[4];

    if(arg == "-r") {
     process.exec(`node ${output}`);
    }
  }*/
} catch (e) {
  console.error(e);
}