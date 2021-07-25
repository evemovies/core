"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const async_wrapper_1 = require("../util/async-wrapper");
const authentication_controller_1 = require("../controllers/authentication-controller");
const routes = express_1.default.Router();
routes.post('/request-otp-code', async_wrapper_1.asyncWrapper(authentication_controller_1.requestOTPCode));
routes.post('/login', async_wrapper_1.asyncWrapper(authentication_controller_1.login));
exports.default = routes;
//# sourceMappingURL=unprotected-routes.js.map