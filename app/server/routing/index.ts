import express, { Application, Response } from 'express';
import path from 'node:path';

const okhStatics = express.static(path.resolve(__dirname, '..', '..', 'okh'));

export default (app: Application): void => {
  app.get('/', (_request, response: Response<string>) => {
    response.send('from router');
  });

  app.use('/okh', okhStatics);
};
