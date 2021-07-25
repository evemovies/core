"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MovieSchema = new mongoose_1.Schema({
    _id: String,
    title: String,
    year: Number,
    posterUrl: String,
    language: String,
    released: Boolean,
}, { _id: false });
const Movie = mongoose_1.model('Movie', exports.MovieSchema);
exports.default = Movie;
//# sourceMappingURL=Movie.js.map