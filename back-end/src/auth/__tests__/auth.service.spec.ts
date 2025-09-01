import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import jwtConfig from '../../common/config/jwt.config';
import { Roles } from '../../common/enums/role.enum';
import { HashingProtocol } from '../../common/hashing/hashing-protocol';
import { UserService } from '../../user/services/user.service';
import { LoginDto } from '../dto/login-auth.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { AuthService } from '../services/auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let hashingService: HashingProtocol;
  let jwtService: JwtService;

  const mockUser = {
    id: randomUUID(),
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedPassword',
    roles: [Roles.User],
    createdAt: new Date(),
    updatedAt: new Date(),
    favorites: [],
    reviews: [],
  };

  const mockJwtConfig = {
    secret: 'test-secret',
    signOptions: {
      expiresIn: 3600,
      audience: 'test-audience',
      issuer: 'test-issuer',
    },
    refreshToken: 86400,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: jwtConfig.KEY,
          useValue: mockJwtConfig,
        },
        {
          provide: HashingProtocol,
          useValue: {
            compare: jest.fn(),
            hash: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    hashingService = module.get<HashingProtocol>(HashingProtocol);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(hashingService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser as any);
      jest.spyOn(hashingService, 'compare').mockResolvedValue(true);
      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValueOnce('mock-access-token')
        .mockResolvedValueOnce('mock-refresh-token');

      const result = await service.login(loginDto);

      expect(userService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(hashingService.compare).toHaveBeenCalledWith(
        loginDto.password,
        mockUser.password,
      );
      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(result).toEqual(mockTokens);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      const loginDto: LoginDto = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(userService.findByEmail).toHaveBeenCalledWith(loginDto.email);
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser as any);
      jest.spyOn(hashingService, 'compare').mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(userService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(hashingService.compare).toHaveBeenCalledWith(
        loginDto.password,
        mockUser.password,
      );
    });
  });

  describe('refreshTokens', () => {
    it('should refresh tokens successfully', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'valid-refresh-token',
      };

      const mockPayload = {
        sub: mockUser.id,
        email: mockUser.email,
        roles: mockUser.roles,
      };

      const mockTokens = {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      };

      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockPayload);
      jest.spyOn(userService, 'findById').mockResolvedValue(mockUser as any);
      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValueOnce('new-access-token')
        .mockResolvedValueOnce('new-refresh-token');

      const result = await service.refreshTokens(refreshTokenDto);

      expect(jwtService.verifyAsync).toHaveBeenCalledWith(
        refreshTokenDto.refreshToken,
        mockJwtConfig,
      );
      expect(userService.findById).toHaveBeenCalledWith(mockPayload.sub);
      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(result).toEqual(mockTokens);
    });

    it('should throw UnauthorizedException when refresh token is invalid', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'invalid-refresh-token',
      };

      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockRejectedValue(new UnauthorizedException('Invalid token'));

      await expect(service.refreshTokens(refreshTokenDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when user not found during refresh', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'valid-refresh-token',
      };

      const mockPayload = {
        sub: mockUser.id,
        email: mockUser.email,
        roles: mockUser.roles,
      };

      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockPayload);
      jest.spyOn(userService, 'findById').mockResolvedValue(null);

      await expect(service.refreshTokens(refreshTokenDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('generateToken', () => {
    it('should generate access and refresh tokens', async () => {
      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValueOnce('access-token')
        .mockResolvedValueOnce('refresh-token');

      const result = await service.generateToken(mockUser as any);

      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
    });
  });
});
