import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MovieModule } from './movie/movie.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JobsModule } from './common/jobs/jobs.module';
import { TelegramModule } from './common/modules/telegram/telegram.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
    }),
    ScheduleModule.forRoot(),
    TelegramModule,
    JobsModule,
    MovieModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
