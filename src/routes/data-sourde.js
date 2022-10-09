"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const dotenv_1 = require("dotenv");
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const Comment_1 = require("../entities/Comment");
const Vote_1 = require("../entities/Vote");
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: 5432,
    username: process.env.postgres,
    password: process.env.PGPASSWORD,
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Post_1.Post, User_1.User, Comment_1.Comment, Vote_1.Vote],
    migrations: ["migrations/*.ts"],
    subscribers: [],
});
