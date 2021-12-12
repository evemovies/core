import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema({
  _id: false,
})
export class Movie {
  @Prop()
  _id: string;

  @Prop()
  title: string;

  @Prop()
  year: number;

  @Prop()
  posterUrl: string;

  @Prop()
  language: 'en' | 'ru';

  @Prop()
  released: boolean;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
