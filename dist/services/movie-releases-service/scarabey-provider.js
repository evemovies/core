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
exports.scarabeyReleaseChecker = void 0;
const got_1 = __importDefault(require("got"));
const cheerio_1 = __importDefault(require("cheerio"));
const common_1 = require("../../util/common");
/**
 * PROVIDER HAS BEEN DEPRECATED AND IS LEFT HERE FOR HISTORICAL PURPOSES
 * Returns true if movie has been released, false otherwise
 * @param config - config to check the movie
 */
function scarabeyReleaseChecker(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = encodeURI(`http://scarabey.org/?s=${config.title}`);
        let response;
        try {
            // response = await rp.get(url);
            response = yield got_1.default(url);
        }
        catch (e) {
            return false;
        }
        let released = false;
        const $ = cheerio_1.default.load(response.body, {
            decodeEntities: false,
        });
        $('.post-row4').each((index, elem) => {
            if (!$(elem).html().length) {
                return;
            }
            try {
                const configTitle = config.title.replace(/ё/, 'е');
                const movieTitle = $(elem)
                    .find('.archive-note3 a')
                    .html()
                    .replace(/ё/, 'е')
                    .replace(/(\(.*rip.*\))/gi, '')
                    .split('/')[0]
                    .trim()
                    .toLocaleLowerCase();
                const movieYear = $(elem).find('.archive-year strong').text();
                if (common_1.checkStringSimilarity(movieTitle, configTitle) && common_1.isNumberInRage(+config.year, +movieYear)) {
                    released = true;
                }
            }
            catch (e) {
                // TODO: make if instead of try catch
            }
        });
        return released;
    });
}
exports.scarabeyReleaseChecker = scarabeyReleaseChecker;
//# sourceMappingURL=scarabey-provider.js.map