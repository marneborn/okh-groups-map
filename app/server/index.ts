import express from 'express';

import logger from './lib/logger'

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}`);
});
