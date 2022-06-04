import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { MovieModule } from 'src/movie/movie.module';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre('find', function () {
            this.populate('observableMovies');
          });

          schema.pre('findOne', function () {
            this.populate('observableMovies');
          });

          schema.pre('findOneAndUpdate', function () {
            this.populate('observableMovies');
          });

          return schema;
        },
      },
    ]),
    forwardRef(() => AuthModule),
    MovieModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
