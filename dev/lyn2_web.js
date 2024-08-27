/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/
var classRules = {
    METHOD_CALL: /[a-zA-Z0-9]*\.{1}[a-zA-Z0-9]*\(.*\)[;]?/gm,
    CONSTRUCTOR: "",
    METHOD: /[a-z0-9_]+\([a-z0-9_ ,]*\)/gm,
};
var rules = {
    FUNCTION_CALL: /[a-z0-9_]+\([a-z0-9_]*\)[;]?/gm,
    INC_DEC_STATEMENT: /.*[a-zA-Z_0-9].{2}[-+]?(;)/gm,
    INC_DEC_STATEMENT_PRE: /.{2}[-+].*[a-zA-Z_0-9]?(;)/gm,
    CLASSES: classRules,
    NUMBER: /[0-9.]+/gm,
    IDENTIFIER: /[0-9a-z_A-Z]+/gm,
    ASSIGN_STATEMENT: /.*( )?=( )?.*(;)?/gm
};
var TOKEN_TYPES = {
    "IDENTIFIER": "Identifier",
    "ASSIGNMENT": "Assignment",
    "KEYWORD": "ReservedKeyword",
    "SYMBOL_OP": "SymbolAndOperator"
};
function getTokenKind(token) {
    var _tok = token.trim();
    /*if(token.trim() == keywords.DEC_VAR_KEYWD)
        return TOKEN_TYPES.VarDeclStatement*/
    for (var keyword in keywords) {
        if (_tok == keywords[keyword])
            return TOKEN_TYPES.KEYWORD;
    }
    for (var symbol in symbols) {
        if (_tok == symbols[symbol])
            return TOKEN_TYPES.SYMBOL_OP;
    }
    if (_tok.match(rules.IDENTIFIER))
        return TOKEN_TYPES.IDENTIFIER;
    if (_tok == "")
        return "Whitespace";
    /*
    if(_tok.trim().includes(symbols.ASSIGN))
        return TOKEN_TYPES.ASSIGNMENT*/
    return undefined;
}
var code = [];
var keywords = {
    DEC_VAR_KEYWD: "let",
    DEC_CONST_KEYWD: "const",
    DECL_CONST_ALT_KEYWD: "def",
    FUNC_DECL: "fun",
    IF_KEYWD: "if",
    FUNC_RET_KEYWD: "ret",
    AND_OP_KEYWD: "and",
    OR_OP_KEYWD: "or",
    NOT_OP_KEYWD: "not",
    WHILE_KEYWD: "while",
    CLASS_KEYWD: "class",
    METHOD_DECL: "method",
    IMPORT_MODULE_KEYWD: "import",
    OBJ_THIS_INSTANCE: "self",
    ELSE_KEYWD: "else",
    ELIF_KEYWD: "elif",
    BREAK_KEYWD: "exit",
    CONTINUE_KEYWD: "jump",
    EXTENDS_KEYD: "extends"
};
var symbols = {
    SINGL_LINE_COMMENT: "//",
    SINGL_LINE_COMMENT_ALT: "#",
    MULT_LINE_COMMENT_BEGIN: "/*",
    MULT_LINE_COMMENT_END: "*/",
    ASSIGN: "=",
    STATEMENT_END: ";",
    TYPE_ANNOTATION: ":",
    OPENING_CURLY_BRACKET: "{",
    CLOSING_CURLY_BRACKET: "}",
    OPENING_PARENTHESIS: "(",
    CLOSING_PARENTHESIS: ")",
    OBJECT_PROP_OR_METHOD: ".",
    HASHTAG: "#",
    AND_OP: "&&"
};
var std = {
    print: function (arg) {
        document.querySelector(".console").innerText = document.querySelector(".console").innerText + arg;
    },
    printLn: function (arg) {
        document.querySelector(".console").innerText = document.querySelector(".console").innerText + arg + "\n";
    },
    input: function () {
        var val = prompt("Insert a value");
        return val;
    },
    nextString: function () {
        var val = prompt("Insert a value");
        return val;
    },
    nextInt: function () {
        var val = prompt("Insert a value");
        return parseInt(val);
    },
    nextDouble: function () {
        var val = prompt("Insert a value");
        return val;
    },
    nextFloat: function () {
        var val = prompt("Insert a value");
        return parseFloat(val);
    },
    clear: function () {
        document.querySelector(".console").innerText = "";
    }
};
function runCode() {
    try {
        var data = document.querySelector(".ace_content").innerText;
        console.log(data);
        code = data === null || data === void 0 ? void 0 : data.split("\n");
        var tokensTree = [];
        var JSTree = [];
        //Init the std library
        //JSTree.push([stdl[0].split("\n")])
        for (var i = 0; i < (code === null || code === void 0 ? void 0 : code.length); i++) {
            var line = [];
            var _tokens = code[i].trim().split(" ");
            for (var j = 0; j < _tokens.length; j++) {
                line.push({ "kind": getTokenKind(_tokens[j]), "value": _tokens[j] });
            }
            tokensTree.push(line);
        }
        for (var i = 0; i < tokensTree.length; i++) {
            var lineTokens = [];
            var _lineTok = tokensTree[i];
            for (var tok = 0; tok < _lineTok.length; tok++) {
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
                if (_lineTok[tok].kind == TOKEN_TYPES.KEYWORD) {
                    if (_lineTok[tok].value == keywords.AND_OP_KEYWD) {
                        _lineTok[tok].value = symbols.AND_OP;
                    }
                }
                if (_lineTok[tok].value.includes(symbols.OBJECT_PROP_OR_METHOD) &&
                    _lineTok[tok].value.includes(keywords.OBJ_THIS_INSTANCE)) {
                    _lineTok[tok].value = _lineTok[tok].value.replace(keywords.OBJ_THIS_INSTANCE, "this");
                }
                lineTokens.push(_lineTok[tok].value);
            }
            JSTree.push(lineTokens);
        }
        for (var line = 0; line < JSTree.length; line++) {
            //Transform before joining to string
            console.log(JSTree[line]);
            if (JSTree[line][0] == "#" + keywords.DECL_CONST_ALT_KEYWD) {
                if (JSTree[line][1] && JSTree[line][2]) {
                    var _const = {
                        identifier: JSTree[line][1],
                        value: JSTree[line][2]
                    };
                    console.log(_const);
                    JSTree[line] = [keywords.DEC_CONST_KEYWD, _const.identifier, symbols.ASSIGN, _const.value].join(" ");
                }
                else
                    throw ("Arguments missing in constant definition");
                continue;
            }
            if (JSTree[line][0] == keywords.IF_KEYWD ||
                JSTree[line][0] == keywords.WHILE_KEYWD) {
                var ifExprLine = [];
                ifExprLine.push(JSTree[line][0]);
                ifExprLine.push(symbols.OPENING_PARENTHESIS);
                for (var _tok = 1; _tok < JSTree[line].length; _tok++) {
                    if (_tok == JSTree[line].length - 1)
                        if (JSTree[line][_tok] == symbols.OPENING_CURLY_BRACKET) {
                            ifExprLine.push(symbols.CLOSING_PARENTHESIS);
                            ifExprLine.push(symbols.OPENING_CURLY_BRACKET);
                            break;
                        }
                        else {
                            ifExprLine.push(symbols.CLOSING_PARENTHESIS);
                            break;
                        }
                    ifExprLine.push(JSTree[line][_tok]);
                }
                JSTree[line] = ifExprLine;
            }
            JSTree[line] = JSTree[line].join(" ");
        }
        eval(JSTree.join("\n"));
    }
    catch (err) {
        document.querySelector(".console").innerText = err;
    }
}
