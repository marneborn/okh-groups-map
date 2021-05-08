import express, { Application } from 'express';
import path from 'node:path';

// import okhjs from '../../okh-map/index';

const okhStatics = express.static(path.resolve(__dirname, '..', '..', 'dist'));

export default (app: Application): void => {
  // app.get('/', (_request, response: Response<string>) => {
  //   response.send('from router');
  // });

  // app.use('/okh-map/index.js', (_request, response: Response<string>) => {
  //   response.send(okhjs);
  // });
  app.use('/', okhStatics);
};
