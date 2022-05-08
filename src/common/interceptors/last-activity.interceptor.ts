import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, mergeMap, from } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LastActivityInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(mergeMap(() => from(this.updateLastActivity(req.user.id))));
  }

  private async updateLastActivity(userId: string) {
    const now = new Date().getTime();
    await this.userService.updateUser({ _id: userId }, { lastActivity: now });
  }
}
