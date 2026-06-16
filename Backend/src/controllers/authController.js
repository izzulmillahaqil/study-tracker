const bcrypt = require("bcryptjs");
const { createUser, findUserByEmail } = require("../models/userModel");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log(req.body);

        findUserByEmail(email, async (err, result) => {

            if (result.length > 0) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            const hashedPassword =
                await bcrypt.hash(password, 10);

            createUser(
                name,
                email,
                hashedPassword,
                (err, result) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.status(201).json({
                        message: "User registered successfully"
                    });
                }
            );
        });

    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    register
};