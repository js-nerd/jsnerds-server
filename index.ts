import express from 'express';
import dotenv from 'dotenv';

import { pexels, utils } from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use('/pexels', pexels);
app.use('/utils', utils);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
