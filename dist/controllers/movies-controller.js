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
exports.searchMovies = exports.getMovie = void 0;
const response_formatter_1 = require("../util/response-formatter");
const movie_search_1 = require("../services/movies-search/movie-search");
const Movie_1 = __importDefault(require("../models/Movie"));
const getMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield Movie_1.default.findById(req.params.movieId);
    res.json(response_formatter_1.responseFormatter(true, movie));
});
exports.getMovie = getMovie;
const searchMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.query.lang;
    const title = req.query.title;
    const year = Number(req.query.year) || undefined;
    const foundMovies = yield movie_search_1.movieSearch[language]({ title, year, language });
    res.json(response_formatter_1.responseFormatter(true, { foundMovies }));
});
exports.searchMovies = searchMovies;
//# sourceMappingURL=movies-controller.js.map