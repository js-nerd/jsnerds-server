import { Router } from 'express';
import axios from 'axios';

const pexels = Router();

const pexelsAxiosInstance = axios.create({
  baseURL: 'https://api.pexels.com/v1',
});

pexelsAxiosInstance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: process.env.PEXELS_API_KEY as string,
  },
}));

pexels.get('/search/:searchString', (req, res) => {
  pexelsAxiosInstance
    .get('/search', {
      params: {
        query: req.params.searchString,
        per_page: 20,
      },
    })
    .then((aRes) => aRes.data)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(200).json([]);
    });
});

export default pexels;
