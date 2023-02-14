import { PostEntitly } from './../../post/entities/post.entity';
import { UserEntitly } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
export class CommentEntitly {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => UserEntitly, { eager: true, nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntitly;

  @ManyToOne(() => PostEntitly, { eager: true, nullable: false })
  @JoinColumn({ name: 'postId' })
  post: PostEntitly;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
