import { Router } from 'express';

const utils = Router();

utils.get('/are-you-ok', (_req, res) => {
  res
    .status(200)
    .json({ status: 200, statusCode: 'OK', message: 'I am OK :)' });
});

export default utils;
