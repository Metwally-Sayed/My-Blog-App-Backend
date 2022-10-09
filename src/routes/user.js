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
const User_1 = require("../entities/User");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.User.find();
    res.json({ data: users });
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, } = req.body;
    try {
        const respond = yield User_1.User.create({
            firstname,
            lastname,
            email
        });
        yield respond.save();
        res.json({ "mes": respond });
    }
    catch (error) {
        res.json({ msg: "server is down" });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const user = yield User_1.User.findOne({
            where: { id },
            relations: { posts: true },
        });
        if (!user) {
            return res.status(404).json({ msg: "user not found" });
        }
        res.json({ data: user });
    }
    catch (error) {
        res.status(500).json({ mesg: error });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const user = yield User_1.User.delete(id);
        res.json({ data: user });
    }
    catch (error) {
        res.status(500).json({ mesg: error });
    }
}));
exports.default = router;
