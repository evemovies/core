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
exports.scarfilmReleaseChecker = void 0;
const got_1 = __importDefault(require("got"));
const cheerio_1 = __importDefault(require("cheerio"));
const common_1 = require("../../util/common");
/**
 * Returns true if movie has been released, false otherwise
 * @param config - config to check the movie
 */
function scarfilmReleaseChecker(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = encodeURI(`https://scarfilm.org/?s=${config.title}`);
        let response;
        try {
            response = yield got_1.default(url);
        }
        catch (e) {
            return false;
        }
        let released = false;
        const $ = cheerio_1.default.load(response.body, {
            decodeEntities: false,
        });
        $('.widget-content-magone-archive-blog-rolls .shad.item').each((index, elem) => {
            if (!$(elem).html().length)
                return;
            if (!$(elem).find('.item-main').text().includes('Уже в сети'))
                return;
            let releaseNotReady = false;
            const noReleaseKeywords = ['Субтитры', 'Авторский'];
            const movieSnippet = $(elem).find('.item-snippet').text();
            noReleaseKeywords.forEach((keyword) => {
                if (movieSnippet.includes(keyword))
                    releaseNotReady = true;
            });
            if (releaseNotReady)
                return;
            const configTitle = config.title.replace(/ё/, 'е');
            const movieData = $(elem)
                .find('.item-title')
                .text()
                .replace(/ё/, 'е')
                .trim()
                .toLowerCase()
                .split(/\((\d{4})\)/);
            const movieTitle = movieData[0];
            const movieYear = movieData[1];
            if (common_1.checkStringSimilarity(movieTitle, configTitle) && common_1.isNumberInRage(+config.year, +movieYear)) {
                released = true;
            }
            return false;
        });
        return released;
    });
}
exports.scarfilmReleaseChecker = scarfilmReleaseChecker;
//# sourceMappingURL=scarfilm-provider.js.map