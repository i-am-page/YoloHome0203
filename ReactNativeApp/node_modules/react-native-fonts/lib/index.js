"use strict";
/**
 * @author *
 * @description Text component.
 */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* NPM - Node Package Manage */
var react_1 = require("react");
var MyAwesomeComponent = function (_a) {
    var items = _a.children, props = __rest(_a, ["children"]);
    return react_1.default.createElement(react_1.default.Fragment, null);
};
exports.MyAwesomeComponent = MyAwesomeComponent;
