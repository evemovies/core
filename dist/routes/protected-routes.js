"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const async_wrapper_1 = require("../util/async-wrapper");
const general_controller_1 = require("../controllers/general-controller");
const movies_controller_1 = require("../controllers/movies-controller");
const user_controller_1 = require("../controllers/user-controller");
const authentication_controller_1 = require("../controllers/authentication-controller");
const routes = express_1.default.Router();
routes.post('/logout', async_wrapper_1.asyncWrapper(authentication_controller_1.logout));
routes.get('/general/ping', async_wrapper_1.asyncWrapper(general_controller_1.ping));
routes.get('/movies/search', async_wrapper_1.asyncWrapper(movies_controller_1.searchMovies));
routes.get('/movies/:movieId', async_wrapper_1.asyncWrapper(movies_controller_1.getMovie));
routes.get('/user', async_wrapper_1.asyncWrapper(user_controller_1.getUser));
routes.put('/user/add-movie', async_wrapper_1.asyncWrapper(user_controller_1.addMovie));
routes.put('/user/remove-movie', async_wrapper_1.asyncWrapper(user_controller_1.removeMovie));
exports.default = routes;
//# sourceMappingURL=protected-routes.js.map