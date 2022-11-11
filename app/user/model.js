import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const HASH_ROUND = 10

let userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'name field is required'],
    },
    email: {
        type: String,
        require: [true, 'email field is required']
    },
    password: {
        type: String,
        require: [true, 'password field is required']
    },
}, { timestamps: true })

userSchema.path('email').validate(async function(value){
    try {
        const count = await this.model('User').countDocuments({ email : value })
        return !count;
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} has been registered`)

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})

export default mongoose.model('User', userSchema)