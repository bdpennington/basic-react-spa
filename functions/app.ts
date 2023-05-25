import express from 'express';
import cors, { type CorsOptions } from 'cors';
import { Server } from 'typescript-rest';
import os from 'node:os';
import DB from './fauna';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const corsConfig = function (): CorsOptions {
  const appHost = `^https:\\/\\/.*\\.${process.env.APP_DOMAIN}`
  const localhost = process.env.NODE_ENV !== 'production' ? /^https?:\/\/localhost/ : undefined;

  const allowedOrigins = [
    new RegExp(appHost),
    ...(localhost ? [localhost] : []),
  ];

  return {
    origin: function (origin: string, callback: (err: Error | null, allow?: boolean) => void) {
      // Check if the origin is in the allowed origins list
      if (allowedOrigins.some((allowedOrigin) => allowedOrigin.test(origin)) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  };
};

app.use(cors(corsConfig()));

const apiRouter = express.Router();
app.use('/api/v1', apiRouter);

Server.setFileDest(os.tmpdir());
Server.loadServices(apiRouter, `${__dirname}/controllers/api/*.(ts|js)`);

app.get('/healthcheck', async (_req, res: express.Response) => {
  const client = DB.getClient();
  await client.ping();
  res.sendStatus(200);
});

const APP_PORT = process.env.APP_PORT || 3001;

app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}`);
});
