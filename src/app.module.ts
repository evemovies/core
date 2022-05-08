import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JobsModule } from './common/jobs/jobs.module';
import { TelegramModule } from './common/modules/telegram/telegram.module';
import { LastActivityInterceptor } from './common/interceptors/last-activity.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
    }),
    UserModule,
    MovieModule,
    AuthModule,
    AdminModule,
    ScheduleModule.forRoot(),
    TelegramModule,
    JobsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LastActivityInterceptor,
    },
  ],
})
export class AppModule {}
