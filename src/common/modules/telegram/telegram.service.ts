import { Injectable } from '@nestjs/common';
import { Telegram } from 'telegraf';

@Injectable()
export class TelegramService {
  telegram: Telegram;

  constructor() {
    this.telegram = new Telegram(process.env.TELEGRAM_TOKEN, {});
  }

  sendMessage(userId: string, message: string) {
    return this.telegram.sendMessage(userId, message);
  }
}
