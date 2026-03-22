import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Post } from "./post.entity";
import { Comment } from "./comment.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ select: false }) // Password is not returned by default
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts?: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments?: Comment[];
}
