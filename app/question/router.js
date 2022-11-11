import express from 'express';
import { list, detail, store, updateQuestion, deleteQuestion, getAnswer } from './controller.js';
import { isLogin } from '../middleware/auth.js';

export const questionRouter = express.Router()

questionRouter.get('/', isLogin, list)
questionRouter.get('/:id/detail', isLogin, detail)
questionRouter.get('/:id/answer', isLogin, getAnswer)
questionRouter.post('/store', isLogin, store)
questionRouter.put('/:id/update', isLogin, updateQuestion)
questionRouter.delete('/:id/delete', isLogin, deleteQuestion)

export default questionRouter;