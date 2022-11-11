import express from 'express';
import { signup, signin, authme } from './controller.js';

export const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.get('/me', authme)

export default authRouter;