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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
const secrets_1 = require("./secrets");
const User_1 = __importDefault(require("../models/User"));
passport_1.default.use('login', new passport_local_1.Strategy({
    usernameField: '_id',
    passwordField: 'OTPCode',
}, (userId, code, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(userId);
    if (!user)
        return done(null, false, { message: 'User not found' });
    if (code !== user.OTPCode)
        return done(null, false, { message: 'Wrong code' });
    return done(null, user, { message: 'Success!' });
})));
passport_1.default.use(new passport_jwt_1.Strategy({ secretOrKey: secrets_1.JWT_SECRET, jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken() }, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(payload.user._id);
        return done(null, user);
    }
    catch (error) {
        console.log('JWT authentication error', error);
    }
})));
//# sourceMappingURL=passport-setup.js.map