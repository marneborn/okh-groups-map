import express from 'express';

import logger from '../lib/logger';
import routing from './routing';

const app = express();
const port = 3000;

routing(app);

app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}`);
});
