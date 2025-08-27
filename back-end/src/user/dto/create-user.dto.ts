import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @Length(3, 155, { message: 'Name must be between 3 and 155 characters' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @Length(5, 25, { message: 'Password must be between 5 and 25 characters' })
  password: string;
}
