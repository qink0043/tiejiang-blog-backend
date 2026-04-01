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
  AfterLoad,
  AfterInsert,
  AfterUpdate,
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

  @Column({ default: 0 })
  commentCount!: number;

  @Column({ default: 0 })
  likeCount!: number;

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

  readingTime?: number;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  private calculateReadingTime() {
    if (this.content) {
      // 预计阅读时间：每分钟约 400 个字符（中英文混合常规速度）
      const speed = 400;
      this.readingTime = Math.ceil(this.content.length / speed);
      if (this.readingTime < 1) this.readingTime = 1;
    } else {
      this.readingTime = 0;
    }
  }
}
