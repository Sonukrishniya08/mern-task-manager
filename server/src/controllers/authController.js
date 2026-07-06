const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        const passwordRegex =
            /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

        if (!passwordRegex.test(password)) {

            const error = new Error(
                "Password must be at least 6 characters and contain at least one special character."
            );
            error.statusCode = 400;
            return next(error);
        }

        const existingUser =
            await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 400;
            return next(error);

        }

        const salt =
            await bcrypt.genSalt(10);

        const hashedPassword =
            await bcrypt.hash(
                password,
                salt
            );

        const user =
            await User.create({

                email,

                password:
                    hashedPassword

            });

        const token =
            jwt.sign(
                {
                    id: user._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

        res.status(201).json({
            success: true,
            message:
                "User Registered Successfully",

            token

        });

    }
    catch (error) {

        next(error);

    }
};


exports.login = async (req, res, next) => {
    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await User.findOne({
                email
            });

        if (!user) {
            const error = new Error("Invalid Credentials");
            error.statusCode = 400;
            return next(error);
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            const error = new Error("Invalid Credentials");
            error.statusCode = 400;
            return next(error);
        }

        const token =
            jwt.sign(

                {
                    id: user._id
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "7d"
                }

            );

        res.json({
            success: true,
            message:
                "Login Successful",

            token

        });

    }
    catch (error) {

        next(error);

    }
};