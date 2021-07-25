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
exports.ytsReleaseChecker = void 0;
const got_1 = __importDefault(require("got"));
const common_1 = require("../../util/common");
/**
 * Returns true if movie has been released, false otherwise
 * @param config - config to check the movie
 */
function ytsReleaseChecker(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = encodeURI(`https://yts.am/api/v2/list_movies.json?query_term=${config.id}`);
        let response;
        try {
            response = yield got_1.default(url);
        }
        catch (e) {
            return false;
        }
        // TODO: any
        const movies = JSON.parse(response.body).data;
        if (!movies.movies)
            return false;
        return movies.movies.some((movie) => {
            const GOOD_QUALITY = ['720p', '1080p'];
            const isGoodQuality = movie.torrents.some((torrent) => GOOD_QUALITY.includes(torrent.quality));
            return (isGoodQuality &&
                movie.imdb_code === config.id &&
                common_1.checkStringSimilarity(movie.title_english, config.title) &&
                common_1.isNumberInRage(movie.year, config.year));
        });
    });
}
exports.ytsReleaseChecker = ytsReleaseChecker;
//# sourceMappingURL=yts-provider.js.map