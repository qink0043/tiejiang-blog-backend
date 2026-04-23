import { AppDataSource } from "../config/data-source";
import { Comment } from "../models/comment.entity";
import { User } from "../models/user.entity";
import { Post } from "../models/post.entity";
import { CreateCommentDto } from "../dtos/comment.dto";
import { AppError } from "../utils/app-error";
import { HttpCode } from "../utils/response";

export class CommentService {
  private commentRepo = AppDataSource.getRepository(Comment);
  private postRepo = AppDataSource.getRepository(Post);

  async create(data: CreateCommentDto, author?: User) {
    const post = await this.postRepo.findOneBy({ id: data.postId });
    if (!post) throw new AppError("Post not found", HttpCode.NOT_FOUND);

    const comment = this.commentRepo.create({
      content: data.content,
      email: data.email,
      type: data.type || "text",
      imageUrl: data.imageUrl || null,
      post,
    });

    if (author) {
      comment.author = author;
    }

    if (data.parentId) {
      const parent = await this.commentRepo.findOneBy({ id: data.parentId });
      if (parent) comment.parent = parent;
    }

    return await this.commentRepo.save(comment);
  }

  async listByPost(postId: number) {
    const comments = await this.commentRepo.find({
      where: { post: { id: postId } },
      relations: ["author"],
      order: { createdAt: "ASC" },
    });

    return this.buildTree(comments);
  }

  private buildTree(comments: Comment[]) {
    const map = new Map();
    const roots: any[] = [];

    comments.forEach((c) => {
      map.set(c.id, { ...c, children: [] });
    });

    comments.forEach((c) => {
      const node = map.get(c.id);
      if (c.parent) {
        const parent = map.get(c.parent.id);
        if (parent) {
          parent.children.push(node);
        } else {
          roots.push(node);
        }
      } else {
        roots.push(node);
      }
    });

    return roots;
  }
}
