import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { TelegramService } from 'src/common/modules/telegram/telegram.service';
import { IMovie } from 'src/movie/movie.interface';
import { IUser } from './user.interface';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private telegramService: TelegramService,
  ) {}

  async getUserById(id: string): Promise<IUser | undefined> {
    return this.userModel.findOne({ _id: id });
  }

  async getUserToken(userId: string): Promise<unknown> {
    const token = await this.authService.getUserToken(userId);

    return { token };
  }

  async updateUser(
    filter: FilterQuery<UserDocument>,
    update: UpdateQuery<UserDocument> | UpdateWithAggregationPipeline,
  ) {
    return this.userModel.findOneAndUpdate(filter, update, { new: true });
  }

  async addMovie(userId: string, movieId: string) {
    return this.userModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $addToSet: { observableMovies: movieId },
      },
      {
        new: true,
      },
    );
  }

  async getUserMovies(userId: string) {
    const user = await this.userModel.findById(userId);

    return user.observableMovies;
  }

  async removeMovie(userId: string, movieId: string) {
    return this.userModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: { observableMovies: movieId },
      },
      {
        new: true,
      },
    );
  }

  async removeMovieForUsers(movie: IMovie, reason: string) {
    const usersWithThisMovie = await this.userModel.find({ observableMovies: movie.id });

    for (const user of usersWithThisMovie) {
      await this.userModel.findOneAndUpdate(
        {
          _id: user.id,
        },
        {
          $pull: { observableMovies: movie.id },
          $inc: { totalMovies: 1 },
        },
        {
          new: true,
        },
      );

      await this.telegramService.sendMessage(user.id, reason);
    }
  }
}
