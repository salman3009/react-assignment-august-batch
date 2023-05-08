const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'newtonSchool';

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({
            username,
            email,
            password,
        });
        res.status(201).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message,
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Please provide email and password',
            status: 'Error',
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password',
                status: 'Error',
                error: 'Invalid Credentials',
            });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({
                message: 'Invalid email or password',
                status: 'Error',
                error: 'Invalid Credentials',
            });
        }

        const token = jwt.sign({ username: user.username, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, status: 'Success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Something went wrong',
            status: 'Error',
            error: err,
        });
    }
};

const decodeToken = (req, res) => {
    try {
        let { token } = req.body;
        console.log(token);
        const decodedToken = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ payload: decodedToken, status: 'Success' });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { login, signup, decodeToken};