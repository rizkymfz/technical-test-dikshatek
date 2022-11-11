import User from '../user/model.js';
import config from '../../config/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { success, error } from '../../config/response.js'

export const signup = async( req, res ) => {
    try {
        const payload = req.body

        const user = new User(payload)
        await user.save()
        
        delete user._doc.password

        res.status(201).json(success("success", payload))

    } catch (err) {
        if( err && err.name === "ValidationError")
        res.status(422).json(error(
                err.message,
                err.errors
            )
        )
    }
}

export const signin = async( req, res, next) => {

    const { email, password } = req.body
    
    await User.findOne({ email : email }).then((user) => {
        if(user){
            const checkpwd = bcrypt.compareSync(password, user.password)
            if(checkpwd){
                const token = jwt.sign({
                    user : {
                        id : user.id,
                        username : user.username,
                        email : user.email,
                        name : user.name,
                        phoneNumber : user.phoneNumber,
                        avatar : user.avatar
                    }
                }, config.jwtKey)

                res.status(200).json(success("success", {token}))
            }else{
                res.status(403).json(error(
                    'wrong password',
                ))
            }
        }else{
            res.status(403).json(error(
                'email not registered',
            ))
        }
    }).catch((err) => {
        res.status(500).json(error(
            err.message,
        ))
    })
}

export const authme = async (req, res, next) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null

        const data = jwt.verify(token, config.jwtKey)
        const user = await User.findOne({ _id: data.user.id })

        if(!user){
            throw new Error()
        }

        req.user = user
        req.token = token
        res.status(200).json(success("success", user))
        next()
    } catch (err) {
        res.status(401).json(error(
            "Unauthorized"
        ))
    }
}