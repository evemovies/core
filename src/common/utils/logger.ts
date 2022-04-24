import { ConsoleLogger, Injectable, Scope, Request } from '@nestjs/common';
import { IUser } from 'src/user/user.interface';

type LogData = {
  message?: string;
  stack?: string;
  context?: string;
};

interface IRequestWithUser extends Request {
  user: IUser;
}

export function getUserForLog(req: IRequestWithUser) {
  return req.user.id;
}

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  logToFile(data: LogData) {
    if (process.env.NODE_ENV === 'production') {
      console.log('logging to file', data);
    }
  }

  log(message) {
    this.logToFile({ message, context: this.context });
    super.log(message);
  }

  error(message: any, stack?: string, context?: string) {
    this.logToFile({ message, stack, context });
    super.error(message, stack, context);
  }
}
