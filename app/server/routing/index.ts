import express, { Application, Response } from 'express';
import path from 'node:path';

import okhjs from '../../okh';

const okhStatics = express.static(path.resolve(__dirname, '..', '..', 'okh'));

export default (app: Application): void => {
  app.get('/', (_request, response: Response<string>) => {
    response.send('from router');
  });

  app.use('/okh/index.js', (_request, response) => {
    response.send(okhjs);
  });
  app.use('/okh', okhStatics);
};
