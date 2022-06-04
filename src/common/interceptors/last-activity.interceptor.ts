import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LastActivityInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(tap(this.updateLastActivity.bind(this, req.user?.id)));
  }

  async updateLastActivity(userId: string) {
    const now = new Date().getTime();

    if (userId) {
      await this.userService.updateUser({ _id: userId }, { lastActivity: now });
    }
  }
}
