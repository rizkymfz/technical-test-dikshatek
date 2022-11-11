import mongoose from 'mongoose';

let answerSchema = mongoose.Schema({
    answer: {
        type: String,
        require: [true, 'answer field is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question'
    },
}, { timestamps: true })

export default mongoose.model('Answer', answerSchema)