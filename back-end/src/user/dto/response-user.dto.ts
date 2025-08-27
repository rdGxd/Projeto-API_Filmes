import { IsEmail, IsString, IsUUID } from 'class-validator';

export class ResponseDtoUser {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}
