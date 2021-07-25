"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.releaseChecker = void 0;
const index_1 = require("./index");
const russianReleaseCheckers = [index_1.scarfilmReleaseChecker];
const englishReleaseCheckers = [index_1.ytsReleaseChecker];
const checkRelease = (checkers) => (config) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Promise.all(checkers.map((checker) => checker(config)));
    return result.some((result) => result); // At least 1 checker should return true
});
exports.releaseChecker = {
    en: checkRelease(englishReleaseCheckers),
    ru: checkRelease(russianReleaseCheckers),
};
//# sourceMappingURL=release-checker.js.map