import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Movie } from '../movie/movie.schema';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' })
  observableMovies: Movie[];

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
