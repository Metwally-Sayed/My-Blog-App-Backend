import { DataSource } from "typeorm";
import "reflect-metadata"
import { config } from "dotenv";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { Comment } from "../entities/Comment";
import { Vote } from "../entities/Vote";

config()
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: 5432,
  username: process.env.postgres,
  password: process.env.PGPASSWORD,
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [Post, User, Comment, Vote],
  migrations: ["migrations/*.ts"],
  subscribers: [],


});