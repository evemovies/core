import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Movie } from 'src/movie/movie.schema';

export type UserDocument = User & Document;

@Schema({
  _id: false,
})
export class User {
  @Prop()
  _id: string;

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
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  virtuals: true,
});
