
const models = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const { secret } = require('../config/auth');

const AuthController = {};

AuthController.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await models.user.findOne({
            where: { email }
        });
        console.log(userFound);
        if (!userFound) {
            throw new Error('User or password not valid');
        }
        //Check password
        const passCheck = await bcrypt.compare(password, userFound.password);

        if (!passCheck) {
            throw new Error('Password or user not valid');
        }
        //Check if JWT secret is defined
        const secret = process.env.JWT_SECRET;

        if (secret.length < 1) {
            throw new Error('JWT secret not defined');
        }
        //Generate token
        const token = jwt.sign({
            id: userFound.dataValues.id,
            email: userFound.email,
            created: Date.now(),
            role: userFound.role
        }, authConfig.secret, {
            expiresIn: 86400
        });

        //Send token and message
        res.json({ message: 'User logged in', token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Register new user and generate token
AuthController.register = async (req, res) => {
    const { email, password, username } = req.body;

    //Check if user already exists
    if (await models.user.findOne({ where: { email: email } })) {
        return res.status(400).send({ error: 'User already exists' });
    }
    //Encrypt password
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);

        const user = await models.user.create({
            username,
            email,
            id_role: 2,
            password: hashedPassword
        });
        //Generate token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: authConfig.expires
        });

        res.send({ user, token });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Registration failed' });
    }
}

//Get all users

AuthController.getAllUsers = async (req, res) => {
    const users = await models.user.findAll();
    res.json(users);
};


module.exports = AuthController;