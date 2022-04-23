import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TelegramService } from 'src/common/modules/telegram/telegram.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService, private telegram: TelegramService) {}

  async validateUser(id: string, OTPCode: string) {
    const user = await this.userService.getUserById(id);

    if (user && user.OTPCode === OTPCode) return user;

    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id };

    return {
      user_id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateOtpCode(id: string) {
    let code = '';

    for (let i = 0; i < 4; i++) {
      code += String(Math.floor(Math.random() * 10));
    }

    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new HttpException(
        {
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userService.updateUser({ _id: id }, { OTPCode: code });
    await this.telegram.sendMessage(id, code);
  }
}
