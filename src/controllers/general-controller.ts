import { Request, Response } from 'express';
import { responseFormatter } from '../util/response-formatter';

export const ping = async (req: Request, res: Response): Promise<void> => {
  // Use this method for JWT token verification
  res.json(responseFormatter(true, { pong: 'pong' }));
};
