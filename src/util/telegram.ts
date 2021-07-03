import { Telegram } from 'telegraf';

let telegram: Telegram;

export function initTelegram(): void {
  telegram = new Telegram(process.env.TELEGRAM_TOKEN);
}

export async function writeMessage(userId: string, message: string): Promise<void> {
  await telegram.sendMessage(userId, message);
}
