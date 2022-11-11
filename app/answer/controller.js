import Answer from './model.js'
import { success, error } from '../../config/response.js'

export const list = async (req, res) => {
    try {
        const userID = req.user._id

        const answerModel = await Answer.find({user: userID}).populate('question')
        res.status(200).json(success("success", answerModel))
    } catch (err) {
        res.status(500).json(error(
            err.message,
        ))
    }
}

export const detail = async (req, res) => {
    try {
        const answerModel = await Answer.findOne( {_id:req.params.id} )
            .populate('question')
            .populate('user', 'name email')
        res.status(200).json(success("success", answerModel))
    } catch (err) {
        res.status(500).json(error(
            err.message,
        ))
    }
}

export const store = async (req, res) => {
    try {
        const { answer, question } = req.body
        const userID = req.user._id

        const answerModel = await Answer.create({
            answer,
            user: userID,
            question,
        })
        res.status(201).json(success("success add data", answerModel))
    } catch (err) {
        res.status(500).json(error(
            err.message,
        ))
    }
}

export const updateAnswer = async (req, res) => {
    try {
        const { answer, question } = req.body
        const userID = req.user._id

        const answerModel = await Answer.findOneAndUpdate({_id:req.params.id}, {
            answer,
            user: userID,
            question,
        }).populate('question')
        res.status(200).json(success("success update data", answerModel))
    } catch (err) {
        res.status(500).json(error(
            err.message,
        ))
    }
}

export const deleteAnswer = async (req, res) => {
    try {
        
        await Answer.findOneAndRemove({_id:req.params.id})
        res.status(200).json(success("delete success"))
    } catch (err) {
        res.status(500).json(error(
            err.message,
        ))
    }
}