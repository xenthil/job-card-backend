import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import JoTypeRouter from './routes/JoTypeRouter';
import Unit from './routes/Unit'
import AuthRoute from './routes/Auth'
import ClientRoute from './routes/Client'
import material from './routes/Material'

export function createApp(){
    const app = express();

    app.use(cors())
    app.use(compression())
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/auth',AuthRoute)
    app.use('/api/client',ClientRoute)
    app.use('/api/client',ClientRoute)
    app.use('/api/unit',Unit)
    app.use('/api/materials', material);
    app.use('/api/JoTypeRouter', JoTypeRouter);
    
    
    return app;
}