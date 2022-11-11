import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import db from './db/index.js'
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import http from 'http';
import authRouter from './app/auth/router.js'
import questionRouter from './app/question/router.js';
import answerRouter from './app/answer/router.js';

dotenv.config();
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));

const app = express();
const server = http.createServer(app);
const port = process.env.PORT;
const URL = `/api/v1`

app.use(cors())
app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(`${URL}/auth`, authRouter)
app.use(`${URL}/question`, questionRouter)
app.use(`${URL}/answer`, answerRouter)

server.listen(port, () => console.log(`Server Running at port: ${port}`));
