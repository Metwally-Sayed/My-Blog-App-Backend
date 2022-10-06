import {
  BaseEntity,
  Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm"
import { Post } from "./Post";
import { Comment } from "./Comment";
import { Vote } from "./Vote";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string

  @Column()
  lastname: string

  @Column({ unique: true })
  email: string

  @Column({
    nullable: true
  })
  img: string

  @Column({
    nullable: true
  })
  dateOfBirth: Date

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[]
}
