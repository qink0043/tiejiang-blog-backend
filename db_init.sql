-- 数据库初始化脚本

CREATE DATABASE IF NOT EXISTS tiejiang_blog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tiejiang_blog;

-- 用户表 (由 TypeORM 自动生成，此处仅为参考设计)
-- CREATE TABLE IF NOT EXISTS `users` ( ... )

-- 文章表
-- CREATE TABLE IF NOT EXISTS `posts` ( ... )

-- 设计说明：
-- 1. 用户 (User) 与 文章 (Post) 为 一对多 关系。
-- 2. 分类 (Category) 与 文章 (Post) 为 一对多 关系。
-- 3. 标签 (Tag) 与 文章 (Post) 为 多对多 关系（通过 post_tags 中间表）。
-- 4. 评论 (Comment) 采用 parentId 设计，支持递归展示评论树。
