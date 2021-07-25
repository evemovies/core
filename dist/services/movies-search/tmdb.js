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
exports.tmdb = void 0;
const got_1 = __importDefault(require("got"));
const languagesMap = {
    ru: 'ru-RU',
    en: 'en-US',
};
/**
 * Returns list of movies from the TheMovieDatabase API
 * @param params - search parameters
 */
function tmdb(params) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: it has limits 40 requests per 10 seconds. Make a race between
        //  en response and setTimeout 2500
        const year = params.year ? `&year=${params.year}` : '';
        const url = encodeURI(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=${languagesMap[params.language]}&query=${params.title}&page=1&include_adult=false${year}`);
        let response;
        try {
            response = yield got_1.default(url);
            return response.body.results.map((movie) => ({
                id: movie.id,
                title: movie.title,
                year: Number(movie.release_date.slice(0, 4)),
            }));
        }
        catch (e) {
            return [];
        }
    });
}
exports.tmdb = tmdb;
//# sourceMappingURL=tmdb.js.map