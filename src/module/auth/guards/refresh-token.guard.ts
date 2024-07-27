import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const httpContext = context.switchToHttp();
      const request: Request = httpContext.getRequest<Request>();
      const token = this.authService.extractToken(request);
      const rToken = request.body.refreshToken;
      console.log('aliiiiiiiii', rToken);

      request.user =
        await this.authService.validateAccessTokenForRefresh(token);
      console.log('aliiiiiiiiii');
      await this.authService.validateRefreshToken(rToken);

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
