require('express-async-errors');
import express from 'express';
import { router } from './router';
import { serve, setup } from 'swagger-ui-express';
import cors from 'cors';

export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use('/api-docs', serve, setup(require('../swagger.json')));
