import { rules } from "../grammar";
import { keywords } from "../keywords";
import { symbols } from "../symbols";
import { TToken } from "../type/types";

export const TOKEN_TYPES = {
    "IDENTIFIER": "Identifier",
    "ASSIGNMENT": "Assignment",
    "KEYWORD": "ReservedKeyword",
    "SYMBOL_OP": "SymbolAndOperator"
}

export function getTokenKind(token: TToken){
    const _tok = token.trim();
    /*if(token.trim() == keywords.DEC_VAR_KEYWD)
        return TOKEN_TYPES.VarDeclStatement*/

    for(let keyword in keywords){
        if(_tok == keywords[keyword])
            return TOKEN_TYPES.KEYWORD
    }

    for(let symbol in symbols){
        if(_tok == symbols[symbol])
            return TOKEN_TYPES.SYMBOL_OP
    }

    if(_tok.match(rules.IDENTIFIER))
        return TOKEN_TYPES.IDENTIFIER

    if(_tok == "") return "Whitespace"

    /*
    if(_tok.trim().includes(symbols.ASSIGN))
        return TOKEN_TYPES.ASSIGNMENT*/

    return undefined
}