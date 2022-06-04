import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Movie } from 'src/movie/movie.schema';

export type UserDocument = User & Document;

@Schema({
  _id: false,
})
export class User {
  @Prop()
  _id: string;

  id: string;

  @Prop()
  created: number;

  @Prop()
  username: string;

  @Prop()
  name: string;

  @Prop({ ref: 'Movie' })
  observableMovies: Movie[] | string[];

  @Prop()
  lastActivity: number;

  @Prop()
  language: 'en' | 'ru';

  @Prop()
  totalMovies: number;

  @Prop()
  OTPCode: string;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id;
});

UserSchema.set('toJSON', {
  virtuals: true,
});

UserSchema.set('toObject', {
  virtuals: true,
});

UserSchema.methods.toJSON = function () {
  const user: any = this.toObject();

  delete user._id;
  delete user.__v;
  delete user.token;

  if (Array.isArray(user.observableMovies)) {
    user.observableMovies.forEach((movie) => {
      delete movie._id;
      delete movie.__v;
    });
  }

  return user;
};
