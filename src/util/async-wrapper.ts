import { RequestHandler, Request, Response, NextFunction } from 'express';

type ReturnType = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const asyncWrapper = (fn: RequestHandler): ReturnType => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
