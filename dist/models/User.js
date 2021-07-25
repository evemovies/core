"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.UserSchema = new mongoose_1.default.Schema({
    _id: String,
    created: Number,
    username: String,
    name: String,
    observableMovies: [
        {
            type: String,
            ref: 'Movie',
        },
    ],
    lastActivity: Number,
    language: String,
    totalMovies: Number,
    OTPCode: String,
}, { _id: false });
exports.UserSchema.pre('find', function () {
    this.populate('observableMovies');
})
    .pre('findOne', function () {
    this.populate('observableMovies');
})
    .pre('findOneAndUpdate', function () {
    this.populate('observableMovies');
});
const User = mongoose_1.default.model('User', exports.UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map