import express from 'express';
import { list, detail, store, updateAnswer, deleteAnswer } from './controller.js';
import { isLogin } from '../middleware/auth.js';

export const answerRouter = express.Router()

answerRouter.get('/', isLogin, list)
answerRouter.get('/:id/detail', isLogin, detail)
answerRouter.post('/store', isLogin, store)
answerRouter.put('/:id/update', isLogin, updateAnswer)
answerRouter.delete('/:id/delete', isLogin, deleteAnswer)

export default answerRouter;