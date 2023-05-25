import { type Request, type Response } from 'express';
import { Errors, Return } from 'typescript-rest';

/**
 * The validateApiKey() function is a middleware that will throw an UnauthorizedError
 * if the 'x-api-key' header is not set correctly.
 *
 * @param req
 */
export function validateApiKey(req: Request, res: Response) {
  if (req.headers['x-api-key'] !== process.env.APP_API_KEY) {
    res.status(401).send(new Errors.UnauthorizedError('Invalid API Key'));
  }
}
