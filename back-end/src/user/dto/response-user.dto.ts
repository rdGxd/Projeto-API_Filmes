import { Expose } from 'class-transformer';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class ResponseDtoUser {
  @IsString()
  @IsUUID()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  name: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  createdAt: string;

  @IsString()
  @Expose()
  updatedAt: string;
}
