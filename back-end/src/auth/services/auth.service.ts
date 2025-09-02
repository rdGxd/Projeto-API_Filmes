import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HashingProtocol } from 'src/common/hashing/hashing-protocol';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import jwtConfig from '../../common/config/jwt.config';
import { LoginDto } from '../dto/login-auth.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly hashingService: HashingProtocol,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!(await this.hashingService.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const accessTokenPromise = this.signJwtAsync<Partial<User>>(
      user.id,
      this.jwtConfiguration.signOptions.expiresIn,
    );

    const refreshTokenPromise = this.signJwtAsync(
      user.id,
      this.jwtConfiguration.refreshToken,
    );

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        this.jwtConfiguration,
      );

      const user = await this.userService.findById(sub);

      if (!user) throw new UnauthorizedException('User not found');

      return await this.generateToken(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async signJwtAsync<T>(sub: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.signOptions.audience,
        issuer: this.jwtConfiguration.signOptions.issuer,
        expiresIn,
      },
    );
  }
}
