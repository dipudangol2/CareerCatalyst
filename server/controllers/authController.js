import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";

// * Variables
const maxAge = 3 * 24 * 60 * 60 * 1000;

// * Functions
const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, {
        expiresIn: maxAge,
    });
};

export const signup = async (request, response, next) => {
    try {
        const { fullName, email, password } = request.body;
        if (!email && !password && !!fullName) {
            return response.status(400).send({ message: "Credentials not passed!" });
        }

        const existingUser = await User.findOne({ email, fullName });
        if (existingUser) {
            return response.status(400).send({ message: "User already exists!" });
        }

        const user = await User.create({ fullName, email, password });
        response.cookie("jwt", createToken(email, user.id), {
            maxAge: maxAge,
            secure: true,
            sameSite: "None",
        });
        return response.status(201).json({
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        console.log(`Error occured in signup: ${error}`);
        return response.status(500).send({ message: "Internal Server Error" });
    }
};

export const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email && !password) {
            return response.send.status(400).send({ message: "Email and Password is required." });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).send({ message: "User with the credentials not found!" });
        }
        const auth = await compare(password, user.password);
        if (!auth) {
            return response.status(400).send({ message: "Password is incorrect!!" });
        }
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,
            secure: true,
            sameSite: "None",
        });
        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
            },
        });
    } catch (error) {
        console.log(`Error occured: ${error}`);
        return response.status(500).send({ message: "Internal Server Error" });
    }
};

export const logout = (request, response, next) => {
    try {
        response.clearCookie("jwt").status(200).send({
            message: "Logged out successfully",
        });
    } catch (error) {
        console.log("Error occured in logout: " + error);
    }
}

