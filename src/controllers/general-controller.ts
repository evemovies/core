import { Request, Response } from 'express';

export const ping = async (req: Request, res: Response): Promise<void> => {
  // Use this method for JWT token verification
  res.json({ success: true, data: { pong: 'pong' } });
};
