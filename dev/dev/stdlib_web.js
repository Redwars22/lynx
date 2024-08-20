"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STD = void 0;
var STD = /** @class */ (function () {
    function STD() {
    }
    STD.prototype.print = function (arg) {
        document.querySelector(".console").innerText = arg;
    };
    STD.prototype.printLn = function (arg) {
        console.log(arg + "\n");
    };
    STD.prototype.input = function () {
        var val = prompt("Insert a value: ");
        return val;
    };
    return STD;
}());
exports.STD = STD;
