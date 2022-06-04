import { HttpException, HttpStatus, Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TelegramService } from 'src/common/modules/telegram/telegram.service';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
    private telegram: TelegramService,
  ) {}

  async validateUser(id: string, OTPCode: string) {
    const user = await this.userService.getUserById(id);

    if (user && user.OTPCode === OTPCode) return user;

    return null;
  }

  async login(user: IUser) {
    const payload = { sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    await this.userService.updateUser({ _id: user.id }, { token });

    return {
      user_id: user.id,
      access_token: token,
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

  async getUserToken(userId: string) {
    const user = await this.userService.getUserById(userId);

    const newToken = await this.jwtService
      .verifyAsync(user.token)
      .then(() => user.token)
      .catch(() => this.jwtService.signAsync({ sub: userId }));

    if (user.token !== newToken) {
      await this.userService.updateUser({ _id: user.id }, { token: newToken });
    }

    return newToken;
  }
}
