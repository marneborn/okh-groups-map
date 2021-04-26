import express, { Application, Response } from 'express';
import path from 'node:path';

import okhjs from '../../okh-map/index';

const okhStatics = express.static(path.resolve(__dirname, '..', '..', 'okh-map'));
console.log(path.resolve(__dirname, '..', '..', 'okh-map'))
export default (app: Application): void => {
  app.get('/', (_request, response: Response<string>) => {
    response.send('from router');
  });

  app.use('/okh-map/index.js', (_request, response: Response<string>) => {
    response.send(okhjs);
  });
  app.use('/okh-map', okhStatics);

  // app.use('/okh/index.js', (_request, response) => {
  //   response.send(okhjs);
  // });
  // app.use('/okh', okhStatics);
};
