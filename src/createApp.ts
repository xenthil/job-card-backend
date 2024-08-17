import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import AuthRoute from './routes/Auth'
import ClientRoute from './routes/Client'


export function createApp(){
    const app = express();

    app.use(cors())
    app.use(compression())
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/auth',AuthRoute)
    app.use('/api/client',ClientRoute)
    
    return app;
}