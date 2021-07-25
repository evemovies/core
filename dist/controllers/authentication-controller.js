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
exports.logout = exports.requestOTPCode = exports.login = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../util/secrets");
const response_formatter_1 = require("../util/response-formatter");
const telegram_1 = require("../util/telegram");
const User_1 = __importDefault(require("../models/User"));
const login = (req, res, next) => {
    passport_1.default.authenticate('login', (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err || !user) {
            console.log('Error', err, user, info);
            return res.status(401).json(response_formatter_1.responseFormatter(false, 'Wrong or outdated OTP code'));
        }
        req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(401).json(response_formatter_1.responseFormatter(false, 'Wrong or outdated OTP code'));
            }
            const body = { _id: user._id };
            const token = jsonwebtoken_1.default.sign({ user: body }, secrets_1.JWT_SECRET, { expiresIn: '100d' });
            yield telegram_1.writeMessage(user._id, 'You have successfully logged in to the mobile app!');
            return res.json(response_formatter_1.responseFormatter(true, { token }));
        }));
    }))(req, res, next);
};
exports.login = login;
const requestOTPCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += String(Math.floor(Math.random() * 10));
    }
    const user = yield User_1.default.findById(req.body.user_id);
    if (!user) {
        res.status(404).json(response_formatter_1.responseFormatter(false, 'User not found'));
        return;
    }
    // TODO: add date and make it available for 2-5 mins
    yield user.updateOne({ OTPCode: code });
    yield telegram_1.writeMessage(user._id, code);
    res.json(response_formatter_1.responseFormatter(true, {}));
});
exports.requestOTPCode = requestOTPCode;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield telegram_1.writeMessage(req.user._id, 'You have successfully logged out of the mobile app!');
    res.json(response_formatter_1.responseFormatter(true, {}));
});
exports.logout = logout;
//# sourceMappingURL=authentication-controller.js.map