import {
  BaseEntity,
  Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Unique, PrimaryColumn, Check
} from "typeorm"
import { Post } from "./Post";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity()
@Check(`"value" = 1 or "value" =  -1`)
@Unique(["post", "user"])
export class Vote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  value: number

  // @PrimaryColumn()
  // userId: number

  // @PrimaryColumn()
  // postId: number

  @ManyToOne(() => User, (user) => user.votes,)
  user: User

  @ManyToOne(() => Post, (post) => post.votes)
  post: Post
}
