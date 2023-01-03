
const models = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const AuthController = {};

//Login and generate token
AuthController.login = async (req, res) => {
    const { email, password } = req.body;
    const userFound = await models.User.findOne({ 
        where: { email } });
    if (!userFound) {
        return res.status(400).json({ message: 'User or password not valid' });
    return
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    if (hashedPassword !== userFound.password) {
        console.log(hashedPassword + ' ' + userFound.password);
        res.status(401).json({ message: 'User or password not valid' });
        return
    }
    console.log(userFound);
    const secret = process.env.JWT_SECRET || "mysecretword";

    if (secret.length < 1) {
        throw new Error('JWT secret not defined');
    }

//Generate token
    const token = jwt.sign({
        id: userFound.id,
        email: userFound.email,
        created: Date.now(),
        role: userFound.role
    }, authConfig.secret, {
        expiresIn: 86400 
});

    res.status(200).json({ token });
      message = "User logged in successfully";
      jwt: token
    }

//Register new user and generate token
AuthController.register = async (req, res) => {
    const { email, password } = req.body;

    if (await models.User.findOne({ where: { email } })) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const user = await models.User.create({
            email,
            password: hashedPassword
        });

    const token = jwt.sign({
        id: user.id,
        email: user.email,
        created: Date.now(),
        role: user.role
    }, authConfig.secret, {
        expiresIn: 86400
    });
} catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error on registry' });
    return
}
    res.status(200).json({ token });
    message = "User created successfully";
    jwt: token
}


module.exports = AuthController;
        