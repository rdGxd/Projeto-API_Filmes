import { Review } from 'src/review/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { genreEnum } from '../enums/genreEnum';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  coverImage: string;
  @Column({ type: 'enum', enum: genreEnum })
  genre: genreEnum;
  @Column({ type: 'int' })
  yearRelease: number;
  @Column({ type: 'decimal', precision: 3, scale: 1 })
  rating: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];

  calcRating() {
    if (!this.reviews || this.reviews.length === 0) {
      return 0;
    }
    const total = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / this.reviews.length;
  }
}
