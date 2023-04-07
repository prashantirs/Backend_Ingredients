import express from 'express';
import dotenv from 'dotenv';
import {router} from './routes/user.js'

const app = express();
dotenv.config({path:'./database/config.env'});


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);

export default app;