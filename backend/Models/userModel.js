const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please Enter First Name']
    },
    lastname: {
        type: String,
        required: [true, 'Please Enter Last Name']
    },
    email: {
        type: String,
        required: [true, 'Please Enter your Email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Enter your Password'],
        minlength: [8, 'Password should have minimum 8 characters']
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    }
},
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = new mongoose.model('User', userSchema);

module.exports = User;