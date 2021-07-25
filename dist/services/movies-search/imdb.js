"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.imdb = void 0;
const imdbAPI = __importStar(require("imdb-api"));
const IMDB_SEARCH_PARAMS = {
    apiKey: process.env.IMDB_API_KEY,
    timeout: 30000,
};
/**
 * Returns list of movies from the imdb API
 * @param params - search parameters
 */
function imdb(params) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            result = yield imdbAPI.search({ name: params.title, year: params.year }, IMDB_SEARCH_PARAMS);
            return result.results.map((item) => ({
                id: item.imdbid,
                title: item.title,
                year: item.year,
                posterUrl: item.poster,
            }));
        }
        catch (e) {
            if (e.message && e.message.includes('Movie not found')) {
                // Don't log this 404 message
            }
            else {
            }
            return [];
        }
    });
}
exports.imdb = imdb;
//# sourceMappingURL=imdb.js.map