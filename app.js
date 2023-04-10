import express from 'express';
import dotenv from 'dotenv';
import {router} from './routes/user.js'
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config({path:'./database/config.env'});


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(router);

export default app;