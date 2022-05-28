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

interface PexelSearchResponse {
  photos: Array<{
    id: string;
    avg_color: string;
    width: number;
    height: number;
    alt: string;
    src: Record<string, string>;
    photographer: string;
    photographer_url: string;
  }>;
}

pexels.get('/search/:searchString', (req, res) => {
  pexelsAxiosInstance
    .get<PexelSearchResponse>('/search', {
      params: {
        query: req.params.searchString,
        per_page: 20,
      },
    })
    .then((aRes) => aRes.data)
    .then(({ photos }) => {
      res.status(200).json(
        photos.map(
          ({
            id,
            avg_color,
            width,
            height,
            alt,
            src,
            src: { original },
            photographer,
            photographer_url,
          }) => ({
            id,
            source: 'pexels',
            averageColor: avg_color,
            width: 1080,
            thumbnailWidth: 200,
            height: Math.round((1080 * height) / width),
            thumbnailHeight: Math.round((200 * height) / width),
            alt,
            url: `${original}?auto=compress&cs=tinysrgb&w=1080`,
            thumbnailUrl: `${original}?auto=compress&cs=tinysrgb&w=200`,
            urls: src,
            submittedBy: photographer,
            profileLink: photographer_url,
          })
        )
      );
    })
    .catch((err) => {
      const { code, status } = err;
      res.status(400).json({ code, status });
    });
});

export default pexels;
