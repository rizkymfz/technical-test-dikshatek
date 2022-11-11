import Question from './model.js'
import Answer from '../answer/model.js'
import { success, error } from '../../config/response.js'

export const list = async (req, res) => {
    try {
        const question = await Question.find().populate('user', 'name email')
        res.status(200).json(success("success", question))
    } catch (err) {
        res.status(500).json(error(
            err.message,
        ))
    }
}

export const detail = async (req, res) => {
    try {
        const question = await Question.findOne( {_id:req.params.id} ).populate('user', 'name email')
        res.status(200).json(success("success", question))
    } catch (err) {
        res.status(500).json(error(
            err.message,
        ))
    }
}

export const store = async (req, res) => {
    try {
        const { title, description } = req.body
        const userID = req.user._id

        const question = await Question.create({
            title,
            description,
            user: userID,
        })
        res.status(201).json(success("success add data", question))
    } catch (err) {
        res.status(500).json(error(
            err.message,
        ))
    }
}

export const updateQuestion = async (req, res) => {
    try {
        const { title, description } = req.body
        const userID = req.user._id

        const question = await Question.findOneAndUpdate({_id:req.params.id}, {
            title,
            description,
            user:userID
        })
        res.status(200).json(success("success update data", question))
    } catch (err) {
        res.status(500).json(error(
            err.message,
        ))
    }
}

export const deleteQuestion = async (req, res) => {
    try {
        
        await Question.findOneAndRemove({_id:req.params.id})
        res.status(200).json(success("delete success"))
    } catch (err) {
        res.status(500).json(error(
            err.message,
        ))
    }
}

export const getAnswer = async (req, res) => {
    try {
        const answerModel = await Answer.find({question: req.params.id}).populate('question')
        res.status(200).json(success("success", answerModel))
    } catch (err) {
        res.status(500).json(error(
            err.message,
        ))
    }
}