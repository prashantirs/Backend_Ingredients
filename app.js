import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors';

const app = express();
dotenv.config({path:'./database/config.env'});


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({  
    origin:[["https://frontend-ingredients.vercel.app"],["http://127.0.0.1:5173"],["http://localhost:5173"]],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,
}));
//Routes
app.use(userRouter);
app.use("/task",taskRouter);

//error handler
app.use(errorMiddleware)

export default app;