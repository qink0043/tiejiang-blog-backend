import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../models/user.entity";
import { Post } from "../models/post.entity";
import { Category } from "../models/category.entity";
import { Tag } from "../models/tag.entity";
import { Comment } from "../models/comment.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "tiejiang_blog",
  synchronize: true, // Only for development! In production, use migrations.
  logging: false,
  entities: [User, Post, Category, Tag, Comment],
  migrations: [],
  subscribers: [],
});
