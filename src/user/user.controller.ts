import { Controller, Get, Request } from '@nestjs/common';
import { IUser } from './user.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@Request() req): Promise<IUser> {
    return this.userService.findOne(req.user.id);
  }
}
