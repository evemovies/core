import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
