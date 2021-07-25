"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncWrapper_1 = require("../util/asyncWrapper");
const movies_controller_1 = require("../controllers/movies-controller");
const routes = express_1.default.Router();
routes.get('/movies', asyncWrapper_1.asyncWrapper(movies_controller_1.getMovies));
exports.default = routes;
//# sourceMappingURL=index.js.map