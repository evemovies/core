"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFormatter = void 0;
const responseFormatter = (success, data) => success ? { success, data } : { success, error: data };
exports.responseFormatter = responseFormatter;
//# sourceMappingURL=response-formatter.js.map