import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Fullname is required!"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required!"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    resume: {
        type: String,
        required: false,
    },
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("Users", userSchema);

export default User;
