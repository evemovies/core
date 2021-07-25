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
exports.removeMovie = exports.addMovie = exports.getUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const Movie_1 = __importDefault(require("../models/Movie"));
const response_formatter_1 = require("../util/response-formatter");
const release_checker_1 = require("../services/movie-releases/release-checker");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.user._id, '-OTPCode');
    res.json(response_formatter_1.responseFormatter(true, user));
});
exports.getUser = getUser;
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = req.body;
    const user = req.user;
    const movieRelease = yield release_checker_1.releaseChecker.en({
        id: movie.id,
        title: movie.title,
        year: movie.year,
    });
    if (movieRelease) {
        res.json(response_formatter_1.responseFormatter(false, 'This move has ben released already'));
        return;
    }
    yield Movie_1.default.findOneAndUpdate({ _id: movie.id }, {
        _id: movie.id,
        title: movie.title.replace(/ё/, 'e'),
        year: movie.year,
        posterUrl: movie.posterUrl,
        language: movie.language,
        released: false,
    }, {
        new: true,
        upsert: true,
    });
    const updatedUser = yield User_1.default.findOneAndUpdate({
        _id: user._id,
    }, {
        $addToSet: { observableMovies: movie.id },
    }, {
        new: true,
    });
    res.json(response_formatter_1.responseFormatter(true, updatedUser));
});
exports.addMovie = addMovie;
const removeMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOneAndUpdate({ _id: req.user._id }, {
        $pull: { observableMovies: req.body.id },
    }, {
        new: true,
    });
    res.json(response_formatter_1.responseFormatter(true, user));
});
exports.removeMovie = removeMovie;
//# sourceMappingURL=user-controller.js.map