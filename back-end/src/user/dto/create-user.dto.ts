import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @Length(3, 155, { message: 'Name must be between 3 and 155 characters' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @Length(5, 25, { message: 'Password must be between 5 and 25 characters' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
