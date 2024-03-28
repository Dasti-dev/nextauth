import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please provide a username"],
        unique: [true,"Username not avaliable"]
    },
    email: {
        type: String,
        required: [true,"Please provide an email"],
        unique: [true,"Email previously used"],
    },
    password: {
        type: String,
        required: [true,"Please provide password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        dafault:false
    },
    forgetPasswordToken: String,
    forgetPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;