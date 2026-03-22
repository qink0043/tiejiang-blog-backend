# Tiejiang Blog Backend

这是一个基于 Node.js + TypeScript + Express + MySQL 开发的个人博客后端系统。

## 技术栈

- **语言**: TypeScript
- **框架**: Express
- **ORM**: TypeORM
- **数据库**: MySQL
- **认证**: JWT (JSON Web Token)
- **参数校验**: class-validator
- **日志**: Winston
- **安全**: Helmet, CORS

## 目录结构

```text
src/
  ├── config/        # 数据库、数据源配置
  ├── controllers/   # 控制器层：处理 HTTP 请求、调用 Service
  ├── services/      # 业务逻辑层：处理复杂业务逻辑
  ├── models/        # 数据库实体 (Entity)
  ├── dtos/          # 数据传输对象与字段校验
  ├── routes/        # 路由定义
  ├── middlewares/   # 中间件 (鉴权、错误处理、参数校验)
  ├── utils/         # 工具类 (Logger, Response, AppError)
  └── index.ts       # 入口文件
```

## 核心功能模块

- [x] **用户模块**: 注册、登录、获取详情、修改。
- [x] **内容模块**:
  - **文章 (Post)**: CRUD, 支持分页、关键词查询、分类/标签多维过滤。
  - **分类 (Category)**: 创建、列表。
  - **标签 (Tag)**: 批量关联文章。
- [x] **评论模块**: 完整的树形（递归）评论结构支持。

## 运行项目

### 1. 配置数据库

在 MySQL 中创建数据库：

```sql
CREATE DATABASE IF NOT EXISTS tiejiang_blog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. 配置环境变量

修改 `.env` 文件：

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=tiejiang_blog
JWT_SECRET=tiejiang_secret_key_2026
JWT_EXPIRES_IN=7d
```

### 3. 安装依赖并启动

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 生产环境运行
npm start
```

## API 接口概览 (部分示例)

### 用户接口

- `POST /api/users/register` - 注册
- `POST /api/users/login` - 登录
- `GET /api/users/me` - 获取个人信息 (需携带 Token)

### 文章接口

- `GET /api/posts` - 获取文章列表 (分页、搜索)
- `GET /api/posts/:id` - 文章详情
- `POST /api/posts` - 发布文章 (需鉴权)
- `PUT /api/posts/:id` - 更新文章 (需鉴权)
- `DELETE /api/posts/:id` - 删除文章 (需鉴权)

### 评论接口

- `GET /api/comments/post/:postId` - 获取文章树形评论
- `POST /api/comments` - 发表评论 (需鉴权)

## 示例请求 (curl)

**登录并获取 Token**

```bash
curl -X POST http://localhost:3000/api/users/login \
     -H "Content-Type: application/json" \
     -d '{"username": "admin", "password": "password123"}'
```

**发布文章**

```bash
curl -X POST http://localhost:3000/api/posts \
     -H "Authorization: Bearer <Your_Token>" \
     -H "Content-Type: application/json" \
     -d '{"title": "我的第一篇博客", "content": "这是博客详情...", "categoryId": 1}'
```
