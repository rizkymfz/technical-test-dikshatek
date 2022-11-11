import mongoose from 'mongoose';

let questionSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, 'title field is required'],
    },
    description: {
        type: String,
        require: [true, 'description field is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    
}, { timestamps: true })

export default mongoose.model('Question', questionSchema)