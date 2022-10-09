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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const Vote_1 = require("../entities/Vote");
const router = (0, express_1.Router)();
router.post("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield Post_1.Post.findOne({ where: { id: +id } });
        if (!post) {
            return res.status(404).json({ msg: "not found" });
        }
        const { userId, value } = req.body;
        const user = yield User_1.User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ msg: "not found" });
        }
        const vote = Vote_1.Vote.create({ user, post, value });
        yield vote.save();
        res.json({ vote });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: "server is down" });
    }
}));
exports.default = router;
