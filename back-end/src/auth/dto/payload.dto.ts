import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Roles } from '../enums/roles.enums';

export class PayloadDto {
  @IsString()
  sub: string;
  @IsString()
  email: string;
  @IsEnum(Roles, { each: true })
  roles: Roles[];
  @IsNumber()
  iat: number;
  @IsNumber()
  exp: number;
  @IsString()
  aud: string;
  @IsString()
  iss: string;
}
