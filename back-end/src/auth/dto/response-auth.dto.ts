import { IsString } from 'class-validator';

export class ResponseAuthDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
