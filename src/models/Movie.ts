import { Schema, Document, model } from 'mongoose';

export interface IMovie extends Document {
  _id: string;
  title: string;
  year: number;
  posterUrl: string;
  language: string;
  released: boolean;
}

export const MovieSchema = new Schema(
  {
    _id: String,
    title: String,
    year: Number,
    posterUrl: String,
    language: String,
    released: Boolean,
  },
  { _id: false }
);

const Movie = model<IMovie>('Movie', MovieSchema);
export default Movie;
