import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReleaseCheckerJob } from './release-checker/release-checker.job';
import { Movie, MovieSchema } from 'src/movie/movie.schema';
import { User, UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ReleaseCheckerJob],
})
export class JobsModule {}
