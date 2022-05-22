"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const pexels = (0, express_1.Router)();
const pexelsAxiosInstance = axios_1.default.create({
    baseURL: 'https://api.pexels.com/v1',
});
pexelsAxiosInstance.interceptors.request.use((config) => ({
    ...config,
    headers: {
        ...config.headers,
        Authorization: process.env.PEXELS_API_KEY,
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
exports.default = pexels;
