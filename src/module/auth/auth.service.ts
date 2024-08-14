import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { JwtPayload } from './types';
import { LoginDto } from './dto/basic.dto';
import { Request } from 'express';
import { isJWT } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const { user_name, password } = loginDto;
    console.log(loginDto);

    const user = await this.userRepository.findOneBy({ user_name });
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('username or password is incorrect');
    }
    console.log(compareSync(password, user.password));

    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException('username or password is incorrect');
    }
    console.log(loginDto, user);
    const { accessToken, refreshToken } = this.makeTokensForUser({
      role: user.role,
      user_name: user.user_name,
      id: user.id,
    });
    await this.updateRtHash(user.id, refreshToken);
    return {
      data: {
        accessToken,
        refreshToken,
      },
      error: false,
      message: 'you logged-in successfully',
    };
  }

  async logout(userId: number): Promise<boolean> {
    await this.userRepository.update(
      { id: userId },
      { refresh_token_hash: null },
    );
    return true;
  }

  async checkAccessToken(request: Request) {
    try {
      const token = this.extractToken(request);
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.getOrThrow('auth.jwtAccessTokenSecret', {
          infer: true,
        }),
      });
      if (typeof payload === 'object' && payload?.id) {
        return payload;
      }
      throw new UnauthorizedException('login on your account ');
    } catch (error) {
      throw new UnauthorizedException('login on your account ');
    }
  }

  async refreshTokens(userId: number, rt: string) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user || !user.refresh_token_hash)
      throw new ForbiddenException('Access Denied');

    const rtMatches = compareSync(rt, user.refresh_token_hash);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const { accessToken, refreshToken } = this.makeTokensForUser({
      role: user.role,
      user_name: user.user_name,
      id: user.id,
    });
    await this.updateRtHash(user.id, refreshToken);
    return {
      data: {
        accessToken,
        refreshToken,
      },
      error: false,
      message: 'refresh token successfully',
    };
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = this.hashValue(rt);
    await this.userRepository.update(userId, { refresh_token_hash: hash });
  }

  makeTokensForUser(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('auth.jwtAccessTokenSecret', {
        infer: true,
      }),
      expiresIn: '30d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('auth.jwtRefreshhTokenSecret', {
        infer: true,
      }),
      expiresIn: '1y',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateAccessToken(token: string) {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.getOrThrow('auth.jwtAccessTokenSecret', {
          infer: true,
        }),
      });
      if (typeof payload === 'object' && payload?.id) {
        const user = await this.userRepository.findOneBy({ id: payload.id });
        if (!user) {
          throw new UnauthorizedException('login on your account');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...resultUser } = user; // رمز عبور را حذف می‌کنیم
        return resultUser;
      }
      throw new UnauthorizedException('login on your account ');
    } catch (error) {
      throw new UnauthorizedException('login on your account ');
    }
  }

  async validateRefreshToken(token: string) {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.getOrThrow('auth.jwtRefreshhTokenSecret', {
          infer: true,
        }),
      });
      if (typeof payload === 'object' && payload?.id) {
        return payload;
      }
      throw new UnauthorizedException('login on your account ');
    } catch (error) {
      throw new UnauthorizedException('login on your account ');
    }
  }

  async validateAccessTokenForRefresh(token: string) {
    try {
      console.log('validateAccessTokenForRefresh1');

      const payload = this.jwtService.verify<JwtPayload>(token, {
        ignoreExpiration: true,
        secret: this.configService.getOrThrow('auth.jwtAccessTokenSecret'),
      });
      console.log('validateAccessTokenForRefresh2');

      // Access token is valid, check the expiration date
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      console.log(
        'validateAccessTokenForRefresh2.1',
        expirationTime,
        currentTime,
      );

      if (currentTime < expirationTime) {
        console.log('aaaa');

        throw new UnauthorizedException('Access token not expired');
      }
      // if (currentTime > expirationTime) {
      //   throw new UnauthorizedException('Access token not expired');
      // }
      console.log('validateAccessTokenForRefresh3');

      return true;
    } catch (error) {
      console.log('validateAccessTokenForRefresh4', error);

      throw new UnauthorizedException('Invalid token');
    }
  }

  extractToken(request: Request) {
    const { authorization } = request.headers;
    if (!authorization || authorization?.trim() == '') {
      throw new UnauthorizedException('Login on your account');
    }
    const [bearer, token] = authorization?.split(' ');
    if (bearer?.toLowerCase() !== 'bearer' || !token || !isJWT(token))
      throw new UnauthorizedException('Login on your account');
    return token;
  }

  hashValue(value: string) {
    const salt = genSaltSync(10);
    return hashSync(value, salt);
  }
}
