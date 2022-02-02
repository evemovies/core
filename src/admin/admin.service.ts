import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getStats() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const epochTime = new Date(year, month, day).getTime();

    const allUsers = await this.userModel.count({});
    const createdToday = await this.userModel.find({ created: { $gte: epochTime } }).count();
    const activeToday = await this.userModel.find({ lastActivity: { $gte: epochTime } }).count();

    return { allUsers, createdToday, activeToday };
  }
}
