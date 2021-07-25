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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filmopotok = void 0;
const got_1 = __importDefault(require("got"));
/**
 * Returns list of movies from the filmopotok
 * @param params - search parameters
 */
function filmopotok(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = encodeURI(`http://filmpotok.ru/search/autocomplete/all/${params.title}`);
        let response;
        try {
            response = yield got_1.default(url);
        }
        catch (e) {
            return [];
        }
        const torrents = JSON.parse(response.body)[1];
        return Object.values(torrents)
            .filter((item) => item.href.startsWith('/film'))
            .map((item) => ({
            id: item.slug.slice(0, 40),
            title: item.value,
            year: item.label.match(/> \((\d{4})/)[1],
            posterUrl: item.label.match(/http:\/\/.*"/g)[0].slice(0, -1),
        }));
    });
}
exports.filmopotok = filmopotok;
//# sourceMappingURL=filmpotok.js.map