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
const Comment_1 = require("../entities/Comment");
const User_1 = require("../entities/User");
const Vote_1 = require("../entities/Vote");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.Post.find({
            relations: { user: true, comment: true, votes: true },
        });
        const postsData = posts.map((post) => {
            return Object.assign(Object.assign({}, post), { totalVoteUp: post.votes.filter((vote) => +vote.value === 1).length, totalVoteDown: post.votes.filter((vote) => +vote.value === -1).length });
        });
        const postData = yield Vote_1.Vote.find({ relations: { user: true, post: true } });
        res.json({
            data: postsData,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, userId } = req.body;
        const user = yield User_1.User.findOne({
            where: { id: +userId },
            relations: { posts: true },
        });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        const post = Post_1.Post.create({
            title,
            body,
            user,
        });
        yield post.save();
        res.json({ data: post });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const post = yield Post_1.Post.findOne({
            where: { id },
            relations: { user: true, comment: true, votes: true },
        });
        if (!post) {
            return res.status(404).json({ message: 'post not found' });
        }
        res.json({ data: post });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const posts = yield Post_1.Post.delete(id);
        res.json({ data: posts });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/:id/comment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { body, userId } = req.body;
        const user = yield User_1.User.findOne({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        const post = yield Post_1.Post.findOne({
            where: { id: +id },
        });
        if (!post) {
            return res.status(404).json({ message: 'post not found' });
        }
        const comment = Comment_1.Comment.create({
            body,
            user,
            post,
        });
        yield comment.save();
        res.json({ data: comment });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}));
exports.default = router;
