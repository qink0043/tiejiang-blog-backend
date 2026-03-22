import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Post } from "./post.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.comments)
  author!: User;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
  post!: Post;

  @ManyToOne(() => Comment, (comment) => comment.children, {
    nullable: true,
    onDelete: "CASCADE",
  })
  parent?: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children?: Comment[];
}
