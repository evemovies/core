import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(id: string, OTPCode: string) {
    const user = await this.userService.findOne(id);

    if (user && user.OTPCode === OTPCode) return user;

    return null;
  }

  async login(user: any) {
    const payload = { sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
