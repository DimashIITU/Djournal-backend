import { UserEntitly } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { OutputBlockData } from '../dto/create-post.dto';

@Entity('posts')
export class PostEntitly {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'jsonb' })
  body: OutputBlockData[];

  @ManyToOne(() => UserEntitly, { eager: true })
  user: UserEntitly;

  @Column()
  description: string;

  @Column({
    default: 0,
  })
  views: number;

  @Column({ nullable: true })
  tags?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
