import { Roles } from 'src/common/enums/role.enum';
import { Favorite } from 'src/favorite/entities/favorite.entity';
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
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, unique: true, nullable: false })
  email: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'enum', enum: Roles, array: true, default: [Roles.User] })
  roles: Roles[];

  @OneToMany(() => Favorite, (favorite) => favorite.user, {
    eager: true,
  })
  favorites: Favorite[];

  @OneToMany(() => Review, (review) => review.user, {
    eager: true,

  })
  reviews: Review[];
}
