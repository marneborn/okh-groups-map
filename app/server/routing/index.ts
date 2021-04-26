import express, { Application } from 'express';
import path from 'path';

const okhStatics = express.static(path.resolve(__dirname, '..', '..', 'okh'));
console.log('fff', path.resolve(__dirname, '..', '..', 'okh'))
export default (app: Application): void => {
  app.get('/', (_req, res) => {
    res.send('from router');
  });

  app.use('/okh', okhStatics);
};