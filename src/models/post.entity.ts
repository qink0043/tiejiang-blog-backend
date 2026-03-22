import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { Tag } from "./tag.entity";
import { Comment } from "./comment.entity";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "longtext" })
  content!: string;

  @Column({ default: 0 })
  viewCount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.posts)
  author!: User;

  @ManyToOne(() => Category, (category) => category.posts, {
    nullable: true,
    onDelete: "SET NULL",
  })
  category?: Category;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({ name: "post_tags" })
  tags?: Tag[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments?: Comment[];
}
