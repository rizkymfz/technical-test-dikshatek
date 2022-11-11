import User from '../user/model.js';
import config from '../../config/index.js';
import jwt from 'jsonwebtoken';
import { success, error } from '../../config/response.js'

export const isLogin = async(req, res, next) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null

        const data = jwt.verify(token, config.jwtKey)
        const user = await User.findOne({ _id: data.user.id })

        if(!user){
            throw new Error()
        } else {
            req.user = user
            req.token = token
            next()
        }

    } catch (err) {
        res.status(401).json(error(
            "Unauthorized"
        ))
    }
}