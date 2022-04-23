import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { Logger } from 'src/common/utils/logger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Public()
  @Post('request-otp-code')
  async requestOtpCode(@Request() req) {
    const userId = req.body._id;

    this.logger.log(`OTP Code requested for ${userId}`);

    await this.authService.generateOtpCode(userId);

    return {};
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    this.logger.log(`Auth attempt for ${req.user._id}`);

    return this.authService.login(req.user);
  }

  @Get('access')
  checkAccess() {
    return {
      access: true,
    };
  }

  @Post('logout')
  logout() {
    return {};
  }
}
