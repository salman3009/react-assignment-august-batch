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

/*
Output for signup: 
{
    "status": "success",
    "data": {
        "user": {
            "_id": "64103ba01fa97ddf5558f1f0",
            "username": "jophne",
            "email": "johnduoe@gmail.com",
            "password": "$2b$10$YUsOjdnmjFgd3edWQXEs..0lkWAQz691Lb4wXxOq5odXTlP4sQW1.",
            "createdAt": "2023-03-14T09:17:20.496Z",
            "updatedAt": "2023-03-14T09:17:20.496Z",
            "__v": 0
        }
    }
}
*/

/* You need to implement the login controller which takes email and password of the user as the input, use bcrypt to unhash the password and check if it matches and generate a JWT token for the user.

Instructions:

The controller expects an HTTP POST request with the user's email and password in the request body.
If the request body is missing either email or password, the controller should respond with a 400 Bad Request status and a JSON object containing a 'message' field with value 'Please provide email and password' and a 'status' field with value 'Error'.

If the user with the given email doesn't exist in the database, the controller should respond with a 401 Unauthorized status and a JSON object containing a 'message' field with value 'Invalid email or password', a 'status' field with value 'Error', and an 'error' field with value 'Invalid Credentials'.

If the password provided doesn't match the user's password in the database, the controller should respond with a 401 Unauthorized status and a JSON object containing a 'message' field with value 'Invalid email or password', a 'status' field with value 'Error', and an 'error' field with value 'Invalid Credentials'.

If the email and password match a user in the database, the controller should generate a JWT containing the user's ID as the payload and a secret key, and respond with a 200 OK status and a JSON object containing a 'token' field with the generated JWT, and a 'status' field with value 'Success'.

If there is an error during the database query or JWT signing process, the controller should respond with a 500 Internal Server Error status and a JSON object containing a 'message' field with value 'Something went wrong', a 'status' field with value 'Error', and an 'error' field with the error object.


Input : 
{
  "email": "test@example.com",
  "password": "password123"
}

Output: 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDEwM2IzOTEyNWVjN2RhMmVlMzc0NjMiLCJpYXQiOjE2Nzg3ODUzNTEsImV4cCI6MTY3ODc4ODk1MX0.BWN0VdqXlE54nq4XZYMHC491LTy_P-QD_oXFweljwNo",
    "status": "Success"
}
*/


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

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
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

/*
Implement a controller to decode a JSON Web Token (JWT) and return the decoded payload

Instructions:

The controller expects an HTTP POST request with a JWT in the request body.
The JWT should be passed in the 'token' field of the request body.
The controller should attempt to decode the JWT using the provided secret key.
If the JWT is successfully decoded, the controller should respond with a 200 OK status and a JSON object containing a 'payload' field with the decoded token payload and a 'status' field with value 'Success'.
If the JWT is invalid or cannot be decoded, the controller should respond with a 401 Unauthorized status and a JSON object containing a 'message' field with value 'Invalid token'.

Input: 
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}

Output:
{
    "payload": {
        "userId": "64100c9a2b615267996ce75c",
        "iat": 1678773410,
        "exp": 1678777010
    },
    status: 'Success'
}

*/

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