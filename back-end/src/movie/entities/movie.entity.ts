import { Review } from 'src/review/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ default: 'https://picsum.photos/200/300' })
  coverImage: string;
  @Column()
  genre: string;
  @Column({ type: 'int' })
  yearRelease: number;
  @Column({ type: 'int' })
  rating: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}
