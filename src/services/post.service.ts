import { AppDataSource } from "../config/data-source";
import { Post } from "../models/post.entity";
import { User } from "../models/user.entity";
import { CreatePostDto, UpdatePostDto, PostQueryDto } from "../dtos/post.dto";
import { Category } from "../models/category.entity";
import { Tag } from "../models/tag.entity";
import { In } from "typeorm";
import { AppError } from "../utils/app-error";
import { HttpCode } from "../utils/response";

export class PostService {
  private postRepo = AppDataSource.getRepository(Post);
  private categoryRepo = AppDataSource.getRepository(Category);
  private tagRepo = AppDataSource.getRepository(Tag);

  async create(data: CreatePostDto, author: User) {
    const post = this.postRepo.create({
      title: data.title,
      content: data.content,
      author,
    });

    if (data.categoryId) {
      const category = await this.categoryRepo.findOneBy({
        id: data.categoryId,
      });
      if (category) post.category = category;
    }

    if (data.tagIds && data.tagIds.length > 0) {
      const tags = await this.tagRepo.findBy({ id: In(data.tagIds) });
      post.tags = tags;
    }

    return await this.postRepo.save(post);
  }

  async list(query: PostQueryDto) {
    const { keyword, categoryId, tagId, page = 1, page_size = 10 } = query;
    const qb = this.postRepo
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "author")
      .leftJoinAndSelect("post.category", "category")
      .leftJoinAndSelect("post.tags", "tags");

    if (keyword) {
      qb.andWhere("(post.title LIKE :keyword OR post.content LIKE :keyword)", {
        keyword: `%${keyword}%`,
      });
    }

    if (categoryId) {
      qb.andWhere("category.id = :categoryId", { categoryId });
    }

    if (tagId) {
      qb.innerJoin("post.tags", "filterTag", "filterTag.id = :tagId", {
        tagId,
      });
    }

    qb.orderBy("post.createdAt", "DESC")
      .skip((page - 1) * page_size)
      .take(page_size);

    const [items, total] = await qb.getManyAndCount();

    return { items, total, page, page_size };
  }

  async getOne(id: number) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ["author", "category", "tags", "comments", "comments.author"],
    });

    if (!post) throw new AppError("Post not found", HttpCode.NOT_FOUND);

    // Increment view count
    post.viewCount += 1;
    await this.postRepo.save(post);

    return post;
  }

  async update(id: number, data: UpdatePostDto) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ["tags"],
    });
    if (!post) throw new AppError("Post not found", HttpCode.NOT_FOUND);

    if (data.title) post.title = data.title;
    if (data.content) post.content = data.content;

    if (data.categoryId !== undefined) {
      if (data.categoryId === null) {
        post.category = undefined;
      } else {
        const category = await this.categoryRepo.findOneBy({
          id: data.categoryId,
        });
        if (category) post.category = category;
      }
    }

    if (data.tagIds) {
      const tags = await this.tagRepo.findBy({ id: In(data.tagIds) });
      post.tags = tags;
    }

    return await this.postRepo.save(post);
  }

  async delete(id: number) {
    const result = await this.postRepo.delete(id);
    if (result.affected === 0)
      throw new AppError("Post not found", HttpCode.NOT_FOUND);
  }
}
